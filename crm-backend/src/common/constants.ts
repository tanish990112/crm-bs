import { StatusCodes } from 'http-status-codes';

export const Constants = {
  statusCodes: {
    OK: StatusCodes.OK,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    ACCEPTED: StatusCodes.ACCEPTED,
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY,
    CREATED: StatusCodes.CREATED,
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
    FORBIDDEN: StatusCodes.FORBIDDEN,
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  },

  messages: {
    SUCCESS: 'Success',
    FAILURE: 'failure',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    USER_ALREADY_EXIST: 'User with this email already exists',
    NO_LEADS: 'No Leads Were Found.',
    LOGIN_FAILED: 'Email Or Password is incorrect.',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NO_DATA_FOUND: 'No Data Found',
    LOGOUT_SUCCESSFULL: 'Logout Successfully',
  },
};
