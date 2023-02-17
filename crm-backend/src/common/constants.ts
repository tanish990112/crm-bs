import { StatusCodes } from 'http-status-codes';

export const Constants = {
  statusCodes: {
    OK: StatusCodes.OK,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    ACCEPTED: StatusCodes.ACCEPTED,
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY,
    CREATED: StatusCodes.CREATED,
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
  },

  messages: {
    success: 'Success',
    failure: 'failure',
    somethingWentWrong: 'Something went wrong',
    internalSeverError: 'Internal Server Error',
    userExist: 'User with this email already exists',
  },
};
