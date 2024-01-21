import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilsService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async getPaginatedResult({
    page,
    take,
    model,
    search,
    include,
  }: {
    page: number;
    take: number;
    model: Prisma.ModelName;
    search?: object;
    include?: object;
  }) {
    const totalRow = await this.prisma[model].count();

    const savePage = page < 1 ? 1 : page;
    const rowsPerPage = take;
    const totalPages = Math.ceil(totalRow / rowsPerPage);
    let rows = [];

    try {
      if (search) {
        rows = await this.prisma[model].findMany({
          skip: (savePage - 1) * rowsPerPage,
          take: rowsPerPage,
          where: search,
          include,
        });
      } else {
        rows = await this.prisma[model].findMany({
          skip: (savePage - 1) * rowsPerPage,
          take: rowsPerPage,
          include,
        });
      }
    } catch (error) {
      console.error(`Error fetching rows from model ${model}: `, error);
      // Return an empty array if there's an error
      rows = [];
    }

    return {
      currentPage: page,
      totalRow,
      rowsPerPage,
      totalPages,
      content: rows,
    };
  }

  verifyJwtToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid token, please request a new one',
      );
    }
  }

  generateJwtToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async hashPassword(password: string) {
    const ROUNDS = 12;
    return await bcrypt.hash(password, ROUNDS);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
}
