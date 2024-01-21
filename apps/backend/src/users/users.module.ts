import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { VerificationsModule } from 'src/verifications/verifications.module';
import { SchoolsModule } from 'src/schools/schools.module';

@Module({
  imports: [UtilsModule, forwardRef(() => VerificationsModule), SchoolsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
