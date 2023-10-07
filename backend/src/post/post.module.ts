import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { IsImageURL } from 'src/common/validators/myFileValidator.validator';

@Module({
  controllers: [PostController],
  providers: [PostService,IsImageURL]
})
export class PostModule {}
