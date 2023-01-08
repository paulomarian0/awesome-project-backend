import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { QueryParamsUserDto } from './dto/query-params-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    const payload = await this.prisma.user.create({
      data,
    });

    return payload;
  }

  async findAll(params: QueryParamsUserDto) {
    if (params.id) params.id = +params.id

    const payload = await this.prisma.user.findMany({
      where: params,
      select: { id: true, login: true, name: true, admin: true, password: false }
    })

    return payload;
  }

  async findByLogin(login: string) {
    const payload = await this.prisma.user.findUnique({
      where: {
        login,
      }
    })

    return payload;
  }

  async update(params: QueryParamsUserDto, data: UpdateUserDto) {
    const id = +params.id

    const payload = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    })

    return payload;
  }

  async updatePassword(params: QueryParamsUserDto, updateUserPasswordDto: UpdateUserPasswordDto) {
    const id = +params.id
    const user = await this.findByLogin(updateUserPasswordDto.login);

    const isPasswordValid = await bcrypt.compare(updateUserPasswordDto.password, user.password);

    if (!isPasswordValid) {
      throw new Error ('Login addres or password incorrect.' )
    }

    const payload = await this.prisma.user.update({
      data:{
        password: await bcrypt.hash(updateUserPasswordDto.newPassword, 10)
      },
      where: {
        id
      }
    })

    return payload;
  }

  async delete(params: QueryParamsUserDto) {
    const id = +params.id
    const payload = await this.prisma.user.delete({
      where: {
        id
      }
    })
    return payload;
  }
}
