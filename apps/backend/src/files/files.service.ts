import { Injectable, NotFoundException } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class FilesService {
  async upload(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(uploadStream);
    });
  }

  async delete(publicId: string) {
    try {
      const response = await cloudinary.uploader.destroy(publicId);
      if (response.result == 'not found') throw new Error(response.result);

      return response;
    } catch (error) {
      if (error.message == 'not found')
        throw new NotFoundException('File not found');
    }
  }

  async replace(
    publicId: string,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    await this.delete(publicId);
    return this.upload(file);
  }
}
