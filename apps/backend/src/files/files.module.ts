import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: 'CLOUDINARY', // 👈
      useFactory: () => {
        return cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
      },
    },
  ],
  exports: [FilesService],
})
export class FilesModule {}
