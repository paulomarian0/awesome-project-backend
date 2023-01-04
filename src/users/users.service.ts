import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { QueryParamsUserDto } from './dto/query-params-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const payload = await this.prisma.user.create({
      data,
    });
    
    return payload;
  }

  async findAll(params: QueryParamsUserDto) {
    if(params.id) params.id = +params.id


    const payload = await this.prisma.user.findMany({
      where: params
    })

    return payload;
  }

  async findUnique(id: number) {
    const payload = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    return payload;
  }

  async update(params: QueryParamsUserDto, data:UpdateUserDto){
    const id = +params.id
    console.log(id)
    const payload = await this.prisma.user.update({
      data,
      where:{
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
