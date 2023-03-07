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
    BAD_REQUEST: StatusCodes.BAD_REQUEST,
  },

  messages: {
    SUCCESS: 'Success',
    FAILURE: 'Failure',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    USER_ALREADY_EXIST: 'User with this email or phone already exists',
    WRONG_DATA: 'Provided Data Does not match.',
    NO_LEADS: 'No lead found.',
    INCORRECT_EMAIL: 'Email is incorrect',
    PASSWORD_INCORRECT: 'Password is incorrect',
    UNAUTHORIZED: 'Unauthorized',
    NO_DATA_FOUND: 'No data found',
    LOGOUT_SUCCESSFULL: 'Logout successfully',
  },

  roles: {
    user: 'USER',
    admin: 'ADMIN',
    staff: 'STAFF',
  },
};
