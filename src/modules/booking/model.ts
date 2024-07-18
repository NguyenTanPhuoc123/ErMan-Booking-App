import {IActionCallback} from '../base';
import {Branch} from '../branch/model';
import {Service} from '../service/model';
import {Staff, User} from '../user/model';

const ROOT_MODULE = 'booking';
export const GET_LIST_BOOKINGS = `${ROOT_MODULE}/GET_LIST_BOOKINGS`;
export const CREATE_NEW_BOOKING = `${ROOT_MODULE}/CREATE_NEW_BOOKING`;
export const UPDATE_STATUS_BOOKING = `${ROOT_MODULE}/UPDATE_STATUS_BOOKING`;
export const GET_LIST_BOOKED = `${ROOT_MODULE}/GET_LIST_BOOKED`;
export const GET_LIST_ALL_BOOKING = `${ROOT_MODULE}/GET_LIST_ALL_BOOKING`;
export const EDIT_BOOKING = `${ROOT_MODULE}/EDIT_BOOKING`;
export const PAY_BOOKING = `{ROOT_MODULE/PAY_BOOKING}`;
export const REFUND_MONEY = `${ROOT_MODULE}/REFUND_MONEY`;
export const GET_LIST_IMAGE_BOOKING = `${ROOT_MODULE}/GET_LIST_IMAGE_BOOKING`;
export const ADD_LIST_IMAGE_BOOKING = `${ROOT_MODULE}/ADD_LIST_IMAGE`;
export interface Booking {
  id: number;
  customer: User;
  staff: Staff;
  datetimeCreate: string;
  dateBooking: string;
  timeBooking: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
  isPaid: boolean;
  total: number;
  branch: Branch;
  payment: PaymentMethod;
  services: Array<Service>;
}

export interface PaymentMethod {
  id: number;
  name: string;
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

export type IActionGetListAllBooking = IActionCallback;
export interface IActionPayBookingPayload extends IActionCallback {
  total: number;
  user: User;
}
export interface IActionUpdateStatusBookingPayload extends IActionCallback {
  id: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
  isPaid?: boolean;
}

export interface IActionCreateNewBookingPayLoad extends IActionCallback {
  body: BookingParams;
}

export interface BookingParams {
  customer: User;
  staff: Staff;
  dateBooking: string;
  timeBooking: string;
  isPaid: boolean;
  branch: Branch;
  payment: number;
  services: Array<Service>;
}

export interface IActionEditBookingPayload extends IActionCallback {
  bookingId: number;
  body: BookingParams;
}

export interface IActionGetListBookedPayload extends IActionCallback {
  staffId: number;
  dateBooking: string;
}

export interface IActionRefundMoneyPayload extends IActionCallback {}

export interface IActionGeListImageBookingPayload extends IActionCallback {
  bookingId: number;
}

export interface IActionAddListImageBookingPayload extends IActionCallback {
  bookingId: number;
  images:Array<string>;
}