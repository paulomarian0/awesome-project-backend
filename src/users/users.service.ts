import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { QueryParamsUserDto } from './dto/query-params-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';

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

  async update(params: QueryParamsUserDto, updateUserDto: UpdateUserDto) {
    const id = +params.id
    const data = {
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password, 10)
    }

    const payload = await this.prisma.user.update({
      data,
      where: {
        id,
      },
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
