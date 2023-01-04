import { IsString } from 'class-validator';

export class LoginRequestBody {
  login: string;

  password: string;
}