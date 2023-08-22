import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id: id },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }

  async findStaff(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username, staff: true },
    });
  }
}
