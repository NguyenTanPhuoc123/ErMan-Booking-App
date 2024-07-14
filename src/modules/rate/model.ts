import {IActionCallback} from '../base';
import {User} from '../user/model';

const ROOT_MODULE = 'rating';
export const CREATE_RATING = `${ROOT_MODULE}/CREATE_RATING`;
export const GET_RATING_BOOKING = `${ROOT_MODULE}/GET_RATING_BOOKING`;
export interface Rating {
  id: number;
  rate: number;
  review: string;
  reviewer: User;
  bookingId: number;
}

export interface IActionCreateRatingPayload extends IActionCallback {
  rate: number;
  review: string;
  reviewer: User;
  bookingId: number;
}

export interface IActionSaveRatingPayload extends IActionCallback {
  rating: Rating;
}

export interface IActionGetRatingBookingPayload extends IActionCallback {
  bookingId: number;
  reviewerId: number;
}

export interface IRatingState {
  ratings: Array<Rating>;
  endCursor?: string;
  hasNextPage: boolean;
}
