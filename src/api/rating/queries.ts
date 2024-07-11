import gql from 'graphql-tag';

export const AddNewRate = gql`
  mutation CreateRating(
    $bookingId: Int
    $rating: Int
    $review: String
    $reviewer: Int
  ) {
    insert_Rate_one(
      object: {
        bookingId: $bookingId
        rating: $rating
        review: $review
        reviewer: $reviewer
      }
    ) {
      id
      bookingId
      rating
      review
      reviewer
    }
  }
`;

export const GetRatingBooking = gql`
  query GetRatingBooking($bookingId: Int, $reviewerId: Int) {
    Rate_connection(
      where: {
        _and: {bookingId: {_eq: $bookingId}, reviewer: {_eq: $reviewerId}}
      }
    ) {
      edges {
        cursor
        node {
          bookingId
          id
          rating
          review
          reviewer
        }
      }
    }
  }
`;
