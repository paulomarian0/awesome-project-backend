import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { QueryParamsUserDto } from './dto/query-params-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

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

  @Get()
  findUnique(@Query() params: any) {
    return this.usersService.findUnique(+params.id)
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(+id, data)
  }

  @Delete()
  delete(@Query() id: number) {
    return this.usersService.delete(+id);
  }
}
