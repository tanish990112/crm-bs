import { Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class APIResponse {
  data: object;
  status: StatusCodes;
  message: string;
  constructor(status: StatusCodes, message: string, data: object) {
    (this.status = status), (this.message = message), (this.data = data);
  }
}
