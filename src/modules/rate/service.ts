import client from '../../api';
import {User} from '../user/model';
import * as RateApi from '../../api/rating/queries';
import {Rating} from './model';

export const createRating = async (
  reviewer: User,
  bookingId: number,
  rate: number,
  review?: string,
) => {
  try {
    const res = await client.mutate({
      mutation: RateApi.AddNewRate,
      variables: {
        bookingId: bookingId,
        rating: rate,
        review: review,
        reviewer: reviewer.id,
      },
    });
    return {result: res};
  } catch (error) {
    console.log('Error create Rating: ', error);
    return {error};
  }
};

export const getRatingBooking = async (
  bookingId: number,
  reviewerId: number,
) => {
  try {
    const res = await client.query({
      query: RateApi.GetRatingBooking,
      variables: {
        bookingId: bookingId,
        reviewerId: reviewerId,
      },
    });
    const data = res.data.Rate_connection.edges[0];
    console.log(data);

    if (data) {
      const {id, ...rate} = data.node;
      const ratingId = JSON.parse(atob(id))[3];
      const rating: Rating = {
        id: ratingId,
        ...rate,
      };

      return {result: rating};
    }
    return {result: undefined};
  } catch (error) {
    console.log('Error get rating booking: ', error);
    return {error};
  }
};
