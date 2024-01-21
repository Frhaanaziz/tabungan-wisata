import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Admin } from 'src/auth/admin.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    const { userId, ...restPaymentData } = createPaymentDto;

    return this.paymentsService.createPayment({
      ...restPaymentData,
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }

  @Admin()
  @Get()
  getAllPayments(
    @Query()
    {
      page,
      take = '10',
      search = '',
    }: {
      page?: string;
      take?: string;
      search?: string;
    },
  ) {
    if (page) {
      return this.paymentsService.getPaymentsPaginated({
        page: parseInt(page),
        take: parseInt(take),
        search,
      });
    }

    return this.paymentsService.getPayments({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.getPayment({ id });
  }
}
