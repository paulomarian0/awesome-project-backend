import { IsBoolean, IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  name: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string

  @IsBoolean()
  admin: boolean
}