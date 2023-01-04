import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
