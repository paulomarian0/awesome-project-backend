import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { QueryParamsUserDto } from './dto/query-params-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(@Query() params: QueryParamsUserDto) {
    return this.usersService.findAll(params)
  }

  @Put()
  update(@Query() params: QueryParamsUserDto, @Body() data: UpdateUserDto) {
    return this.usersService.update(params, data)
  }

  @Put("/profile")
  updatePassword(@Query() params: QueryParamsUserDto, @Body() data: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(params, data)
  }

  @Delete()
  delete(@Query() params: QueryParamsUserDto) {
    return this.usersService.delete(params);
  }
}
