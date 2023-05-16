import { StatusCodes } from 'http-status-codes';

export const Constants = {
  statusCodes: {
    OK: StatusCodes.OK,
    CREATED: StatusCodes.CREATED,
    ACCEPTED: StatusCodes.ACCEPTED,
    FORBIDDEN: StatusCodes.FORBIDDEN,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    BAD_REQUEST: StatusCodes.BAD_REQUEST,
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY,
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
  },

  messages: {
    SUCCESS: 'Success',
    FAILURE: 'Failure',
    NO_LEADS: 'No lead found.',
    UNAUTHORIZED: 'Unauthorized',
    NO_DATA_FOUND: 'No data found',
    INCORRECT_EMAIL: 'Email is incorrect',
    LOGOUT_SUCCESSFUL: 'Logout successfully',
    WRONG_DATA: 'Provided Data Does not match.',
    PASSWORD_INCORRECT: 'Password is incorrect',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    LEAD_EXIST: 'Lead with this contact already exist',
    ACCOUNT_ALREADY_EXISTS: 'Account with this name already exists',
    USER_ALREADY_EXIST: 'User with this email or phone already exist',
  },

  roles: {
    user: 'USER',
    admin: 'ADMIN',
    staff: 'STAFF',
  },
};
