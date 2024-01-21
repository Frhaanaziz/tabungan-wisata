import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';

enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
}

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
