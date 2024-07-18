import client from '../../api';
import {Booking, BookingParams} from './model';
import * as BookingApi from '../../api/booking/queries';
import {Service} from '../service/model';
import {saveListBookings} from './reducer';
import CryptoJS from 'crypto-js';
import {User} from '../user/model';
import storage from '@react-native-firebase/storage';

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
        fetchPolicy: 'network-only',
      });
    } else {
      res = await client.query({
        query: BookingApi.GetListBookings,
        variables: {limit: limit, id: id},
        fetchPolicy: 'network-only',
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

export const getListAllBooking = async () => {
  try {
    const res = await client.query({
      query: BookingApi.GetListAllBookings,
    });
    const listData = res.data.Booking_connection.edges;

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
    return {result: {bookings: listBooking}};
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
        dateBooking: body.dateBooking,
        timeBooking: body.timeBooking,
        total: total,
        payment: body.payment,
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
          endCursor: '',
          hasNextPage: false,
        });
      });
  } catch (error) {
    console.log('Error realtime: ', error);
    return {error};
  }
};

export const getListBooked = async (staffId: number, dateBooking: string) => {
  try {
    const res = await client.query({
      query: BookingApi.getListBooked,
      variables: {staffId: staffId, dateBooking: dateBooking},
    });
    const listData = res.data.Booking_connection.edges;

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
    console.log('List booking: ', listBooking);

    return {result: listBooking};
  } catch (error) {
    console.log('Error get list booked: ', error);
  }
};

export const editBooking = async (bookingId: number, body: BookingParams) => {
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
      mutation: BookingApi.editBooking,
      variables: {
        id: bookingId,
        branchId: body.branch.id,
        customerId: body.customer.id,
        staffId: body.staff.id,
        isPaid: body.isPaid,
        dateBooking: body.dateBooking,
        timeBooking: body.timeBooking,
        total: total,
        payment: 1,
        bookingDetails: listService,
      },
    });
    return {result: res};
  } catch (error) {
    console.log('Error edit booking: ', error);
    return {error};
  }
};

export const payBooking = async (total: number, user: User) => {
  try {
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    let appid = 2553;
    let amount = parseInt(`${total}`);
    let appuser = user.firstname + ' ' + user.lastname;
    let apptime = new Date().getTime();
    let embeddata = '{}';
    let item = '[]';
    let description = 'Merchant description for order #' + apptransid;
    let hmacInput =
      appid +
      '|' +
      apptransid +
      '|' +
      appuser +
      '|' +
      amount +
      '|' +
      apptime +
      '|' +
      embeddata +
      '|' +
      item;
    let mac = CryptoJS.HmacSHA256(
      hmacInput,
      'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    );
    console.log('====================================');
    console.log('hmacInput: ' + hmacInput);
    console.log('mac: ' + mac);
    console.log('====================================');
    var order: any = {
      app_id: appid,
      app_user: appuser,
      app_time: apptime,
      amount: amount,
      app_trans_id: apptransid,
      embed_data: embeddata,
      item: item,
      description: description,
      mac: mac,
    };

    console.log(order);

    let formBody = [] as any;
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const res = await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    }).then(response => response.json());
    console.log('Res: ', res);
    return {result: res};
  } catch (error) {
    console.log('Error when pay: ', error);
    return {error};
  }
};

function getCurrentDateYYMMDD() {
  var todayDate = new Date().toISOString().slice(2, 10);
  return todayDate.split('-').join('');
}

export const getListImageBooking = async (bookingId: number) => {
  try {
    const res = await storage().ref(`bookings/${bookingId}`).listAll();
    const listImg: Array<string> = await Promise.all(
      res.items.map(item => {
        return item.getDownloadURL();
      }),
    );
    return {result: listImg};
  } catch (error) {
    console.log('Error get list image booking: ', error);
    return {error};
  }
};

export const addListImageBooking = (
  bookingId: number,
  images: Array<string>,
) => {
  try {
    const res = images.map(async (image,index) => {
      return await storage().ref(`bookings/${bookingId}/${bookingId}_imageBooking_${index}`).putFile(image);
    });

    return {result: res};
  } catch (error) {
    console.log('Error add list image booking: ', error);
    return error;
  }
};
