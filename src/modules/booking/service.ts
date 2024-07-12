import client from '../../api';
import {Booking, BookingParams} from './model';
import * as BookingApi from '../../api/booking/queries';
import {Service} from '../service/model';
import {saveListBookings} from './reducer';

export const getListBookings = async (
  limit: number,
  id: number,
  after?: string,
) => {
  try {
    let res;

    if (after) {
      res = await client.query({
        query: BookingApi.GetListBookings,
        variables: {limit: limit, after: after, id: id},
      });
    } else {
      res = await client.query({
        query: BookingApi.GetListBookings,
        variables: {limit: limit, id: id},
      });
    }

    const hasNextPage = res.data.Booking_connection.pageInfo.hasNextPage;
    const endCursor = res.data.Booking_connection.pageInfo.endCursor;
    const listData = res.data.Booking_connection.edges;
    if (endCursor === after) {
      console.log('Error Cursor');
      return;
    }

    const listBooking: Booking[] = listData.map((data: any) => {
      const bookingId = JSON.parse(atob(data.node.id))[3];
      const {
        id,
        userByStaff,
        User,
        Payment,
        Branch,
        BookingDetails,
        ...newBooking
      } = data.node;

      const {id: staffId, ...newStaff} = userByStaff.Staff.User;
      const idStaff = JSON.parse(atob(staffId))[3];
      const {id: branchId, ...newBranch} = Branch;
      const idBranch = JSON.parse(atob(branchId))[3];
      const {id: customerId, ...newUser} = User;
      const idCustomer = JSON.parse(atob(customerId))[3];
      const services: Service[] = BookingDetails.map((service: any) => {
        const serviceId = JSON.parse(atob(service.Service.id))[3];
        const {id, ...newService} = service.Service;
        return {id: serviceId, ...newService};
      }) as Service[];
      const {id: paymentId, ...newPayment} = Payment;

      const idPayment = JSON.parse(atob(paymentId))[3];
      return {
        id: bookingId,
        customer: {id: idCustomer, ...newUser},
        staff: {id: idStaff, ...newStaff},
        branch: {id: idBranch, ...newBranch},
        services: services,
        payment: {id: idPayment, ...newPayment},
        ...newBooking,
      };
    }) as Booking[];
    return {result: {bookings: listBooking, hasNextPage, endCursor}};
  } catch (error) {
    console.log('Error get list booking: ', error);
    return {error};
  }
};

export const createNewBooking = async (body: BookingParams) => {
  try {
    let total = 0;
    body.services.map(service => {
      total += service.price;
    });
    const listService = Array(
      ...body.services.map(service => {
        return {service: service.id};
      }),
    );
    const res = await client.mutate({
      mutation: BookingApi.CreateNewBooking,
      variables: {
        branchId: body.branch.id,
        customerId: body.customer.id,
        staffId: body.staff.id,
        isPaid: body.isPaid,
        dateTimeBooking: body.datetimeBooking,
        total: total,
        payment: 1,
        bookingDetails: listService,
      },
    });
    return {result: res};
  } catch (error) {
    console.log('Error create new booking: ', error);
    return {error};
  }
};

export const updateStatusBooking = async (
  id: number,
  status: string,
  isPaid?: boolean,
) => {
  try {
    const res = await client.mutate({
      mutation: BookingApi.updateStatusBooking,
      variables: {
        id,
        status,
        isPaid: isPaid ? isPaid : false,
      },
    });
    const data = res.data.update_Booking_by_pk;
    const bookingId = JSON.parse(atob(data.id))[3];
    const bookingStatus = data.status;
    return {result: {id: bookingId, status: bookingStatus}};
  } catch (error) {
    console.log('Error update status booking: ', error);
  }
};

export const updateBookingRealtime = () => {
  try {
    client
      .subscribe({query: BookingApi.UpdateDataFromServer})
      .subscribe(data => {
        const listBooking: Booking[] = data.data.Booking.map((data: any) => {
          const {
            userByStaff,
            User,
            Payment,
            Branch,
            BookingDetails,
            ...newBooking
          } = data;

          const services: Service[] = BookingDetails.map((service: any) => {
            return {...service.Service};
          }) as Service[];
          return {
            customer: {...User},
            staff: {
              workPlace: {...userByStaff.Staff.Branch},
              timeStartWork: userByStaff.Staff.timeStartWork,
              ...userByStaff.Staff.User,
            },
            branch: {...Branch},
            services: services,
            payment: {...Payment},
            ...newBooking,
          };
        }) as Booking[];
        saveListBookings({
          bookings: listBooking,
          hasNextPage: false,
          endCursor: '',
        });
      });
  } catch (error) {
    console.log('Error realtime: ', error);
    return {error};
  }
};
