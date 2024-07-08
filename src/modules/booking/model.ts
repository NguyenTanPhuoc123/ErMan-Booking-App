import {IActionCallback} from '../base';
import {Branch} from '../branch/model';
import {Service} from '../service/model';
import {Staff, User} from '../user/model';

const ROOT_MODULE = 'booking';
export const GET_LIST_BOOKINGS = `${ROOT_MODULE}/GET_LIST_BOOKINGS`;
export const CREATE_NEW_BOOKING = `${ROOT_MODULE}/CREATE_NEW_BOOKING`;
export const UPDATE_STATUS_BOOKING = `${ROOT_MODULE}/UPDATE_STATUS_BOOKING`;
export interface Booking {
  id: number;
  customer: User;
  staff: Staff;
  datetimeCreate: string;
  datetimeBooking: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
  isPaid: boolean;
  total: number;
  branch: Branch;
  services: Array<Service>;
}

export interface IBookingState {
  bookings: Array<Booking>;
}

export interface IActionGetListBookingPayLoad extends IActionCallback {
  endCursor?: string;
  limit: number;
  id: number;
}

export interface IAcionSaveListBookingPayLoad {
  bookings: Array<Booking>;
  endCursor: string;
  hasNextPage: boolean;
}

export interface IActionUpdateStatusBookingPayload extends IActionCallback {
  id: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
}

export interface IActionCreateNewBookingPayLoad extends IActionCallback {
  body: BookingParams;
}

export interface BookingParams {
  customer: User;
  staff: Staff;
  datetimeBooking: string;
  isPaid: boolean;
  branch: Branch;
  services: Array<Service>;
}
