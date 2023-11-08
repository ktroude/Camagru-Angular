import { Module, OnModuleInit } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MailsModule } from 'src/mails/mails.module';
import { ConfigService } from '@nestjs/config';
import { MailsService } from 'src/mails/mails.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MailsModule],
  controllers: [PostController],
  providers: [PostService, MailsService, ConfigService]
})
export class PostModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService, private readonly mailsService: MailsService) {}

  async onModuleInit() {

    const posts = await this.prismaService.post.findMany();
     if (posts.length === 0) { 
      await  this.generateAutoPost('uploads/1.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/2.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/3.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/4.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/5.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/6.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/7.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
      await  this.generateAutoPost('uploads/8.jpg', 0, 'JhonDoe', 'This is a fake post generated for the beauty of the homepage, hope you enjoy it :)'); 
    }
  }
    
private async generateAutoPost(url:string, id:number, name:string, description:string) {
  await this.prismaService.post.create({
        data: {
          authorId: id,
          author: name,
          description: description,
          picture: url,
      },
    });

}

}






