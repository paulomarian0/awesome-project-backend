import { HttpStatus } from "@nestjs/common";

export interface UserToken {
  access_token: string;
  status: HttpStatus
  userData: {
    user: string,
    admin: boolean,
  }
}