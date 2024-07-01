

export const API_TOKEN_EXPIRATION = 60 * 60; // 60*60 seconds ~ 1 hour

export const API = 'https://ermanbooking.hasura.app/v1beta1/relay';
export const HEADER = {'x-hasura-admin-secret':'A9ngXBcmC0YwgKMm1T8MN7ev61kk2dV86XMBbtwBTwonJISQcGdeEBydbHqQYJrX'}

export const ApiErrorStatusCode = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
}

export const ApiErrorCode = {
  TOKEN_INVALID: 8000
}

export interface ApiError {
  code: number;
  status_code: number;
  message: string;
  data?: any;
  summary?: string;
}
