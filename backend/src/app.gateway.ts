import { NotFoundException } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { MailsService } from './mails/mails.service';

@WebSocketGateway()
export class AppGateway {
  constructor(
    private readonly prismaService: PrismaService,
    private mailsService: MailsService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('comment')
  async handleComment(client: Socket, payload: any) {
    console.log("TRIGGERED")
    console.log(payload)
    const postId = payload.postId;
    const commentAuthor = payload.commentAuthor;

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { authorId: true, id: true },
    });
    if (!post) throw new NotFoundException('post not found');
    const author = await this.prismaService.user.findUnique({
      where: { id: post.authorId },
      select: { id: true, email: true, sendEmail:true },
    });
    if (!author) throw new NotFoundException('author not found');
    const mailInput = {
      to: author.email,
      subject: 'New comment on one of your post',
      html: `Hey there, ${commentAuthor} just commented on one of your posts. Come and see it <a href='http://localhost:4200/post/${post.id}'>here</a>.`,
    };
    if (author.sendEmail === true)
      this.mailsService.sendMail(mailInput);
    this.server.emit('newComment', { id:author.id });
  }

    @SubscribeMessage('like')
  async handleLike(client: Socket, payload: any) {
    const postId = payload.postId;
    const commentAuthor = payload.commentAuthor;

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { authorId: true, id: true },
    });
    if (!post) throw new NotFoundException('post not found');
    const author = await this.prismaService.user.findUnique({
      where: { id: post.authorId },
      select: { id: true, email: true, sendEmail:true },
    });
    if (!author) throw new NotFoundException('author not found');
    const mailInput = {
      to: author.email,
      subject: 'New Like on one of your post',
      html: `Hey there, ${commentAuthor} just liked on one of your posts. Come and see it <a href='http://localhost:4200/post/${post.id}'>here</a>.`,
    };
    if (author.sendEmail === true)
      this.mailsService.sendMail(mailInput);
    this.server.emit('newLike', { id:author.id });
  }
}
