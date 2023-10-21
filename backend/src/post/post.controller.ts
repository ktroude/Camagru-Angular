import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import * as sharp from 'sharp';


import { PostService } from './post.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostDTO, commentDTO } from './dto';
import { MyFileTypeValidator } from 'src/common/validators/myFileValidator.validator';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('new')
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
    @GetCurrentUserId() userId: number,
  ) {
    return this.postService.newPost(file, data, userId);
  }

  @Post('preview')
  @Public()
  @UseInterceptors(FilesInterceptor('files'))
  preview(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(
          new MyFileTypeValidator({
            fileType: ['image/jpeg', 'image/png', 'image/jpg'],
          }),
        )
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 10 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    pictures: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
      return this.postService.preview(pictures, res);
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

  @Get('all')
  @Public()
  @HttpCode(HttpStatus.OK)
  getAllPosts(){
    return this.postService.getAllPosts();
  }

  @Post('createMany')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  createSomePost() {
    this.postService.createSomePost()
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMyPost(@GetCurrentUserId() userId:number) {
    return this.postService.getMyPost(userId);
  }
}
