import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async getPayment(
    paymentWhereUniqueInput: Prisma.PaymentWhereUniqueInput,
  ): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: paymentWhereUniqueInput,
    });
  }

  async getPayments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PaymentWhereUniqueInput;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput;
  }): Promise<Payment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.payment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPayment(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data,
    });
  }

  async updatePayment(params: {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.PaymentUpdateInput;
  }): Promise<Payment> {
    const { where, data } = params;
    return this.prisma.payment.update({
      data,
      where,
    });
  }

  async deletePayment(where: Prisma.PaymentWhereUniqueInput): Promise<Payment> {
    return this.prisma.payment.delete({
      where,
    });
  }

  async getPaymentsPaginated({
    page,
    take,
    search,
  }: {
    page: number;
    take: number;
    search: string;
  }) {
    return this.utilsService.getPaginatedResult({
      page,
      take,
      model: 'Payment',
      search: {
        user: {
          name: {
            contains: search,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
}
