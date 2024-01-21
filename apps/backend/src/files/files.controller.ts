import {
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/public.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async online(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.upload(file);
  }

  @Public()
  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    return this.filesService.delete(publicId);
  }

  @Public()
  @Put(':publicId')
  @UseInterceptors(FileInterceptor('file'))
  async replace(
    @Param('publicId') publicId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.replace(publicId, file);
  }
}
