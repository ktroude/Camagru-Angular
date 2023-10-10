import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MailsModule } from 'src/mails/mails.module';
import { ConfigService } from '@nestjs/config';
import { MailsService } from 'src/mails/mails.service';

@Module({
  imports: [MailsModule],
  controllers: [PostController],
  providers: [PostService, MailsService, ConfigService]
})
export class PostModule {}
