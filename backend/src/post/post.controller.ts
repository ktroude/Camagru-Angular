import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostDTO, commentDTO } from './dto';
import { MyFileTypeValidator } from 'src/common/validators/myFileValidator.validator';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('new/post')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  newPost(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new MyFileTypeValidator({
            fileType: ['image/jpeg', 'image/png'],
          }),
        )
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 8 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body('data') data: PostDTO,
  ) {
    return this.postService.newPost(file, data);
  }

  @Post('preview')
  @UseInterceptors(FilesInterceptor('files'))
  preview(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(
          new MyFileTypeValidator({
            fileType: ['image/jpeg', 'image/png'],
          }),
        )
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 8 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    pictures: Array<Express.Multer.File>
  ) {
    return this.postService.preview(pictures);
  }

  @Post('new/comment')
  @HttpCode(HttpStatus.CREATED)
  newComment(@GetCurrentUserId() userId: number, @Body() comment: commentDTO) {
    return this.postService.newComment(userId, comment);
  }

  @Post('like/post')
  @HttpCode(HttpStatus.CREATED)
  newLikePost(@GetCurrentUser() userId: number, postId: number) {
    return this.postService.newLikePost(userId, postId);
  }

  @Post('like/comment')
  @HttpCode(HttpStatus.CREATED)
  newLikeComment(@GetCurrentUserId() userId: number, commentId: number) {
    return this.postService.newLikeComment(userId, commentId);
  }
}
