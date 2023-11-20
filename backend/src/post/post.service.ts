import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostDTO, commentDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Response } from 'express';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private mailsService: MailsService,
  ) {}

  async newPost(file: Express.Multer.File, data: string, userId: number) {
    const uploadPath = path.join(__dirname, '..', 'post/creations');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const uniqueFileName = new Date().getTime() + '-' + file.originalname;
    const filePath = path.join(uploadPath, uniqueFileName);
    console.log('f Path == ', filePath)
    fs.writeFileSync(filePath, file.buffer);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    await this.prismaService.post.create({
      data: {
        authorId: user.id,
        author: user.username,
        description: data,
        picture: "uploads/" + uniqueFileName,
      },
    });
  }

  async preview(pictures: Array<Express.Multer.File>, res: Response) {
    try {
      const baseImage = sharp(pictures[0].buffer);
      const dimesions = await baseImage.metadata();
      const filterImage = sharp(pictures[1].buffer)
      .ensureAlpha()
      .resize(dimesions.width, dimesions.height, { fit: 'fill' } );
      const compositedImage = baseImage.composite([
        { input: await filterImage.toBuffer(), blend: 'over' },
      ]);
      const imageBuffer = await compositedImage.toBuffer();
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(imageBuffer);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error while generating image');
    }
  }

  async newComment(userId: number, comment: commentDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new NotFoundException('This user does not existe in database');
    const post = await this.prismaService.post.findUnique({
      where: {
        id: comment.postId,
      },
    });
    if (!post)
      throw new NotFoundException('This post does not existe in database');

    const newComment = await this.prismaService.comment.create({
      data: {
        username: user.username,
        content: comment.content,
        postId: post.id,
      },
    });

    await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: {
        comments: {
          connect: {
            id: newComment.id,
          },
        },
      },
    });
    await this.sendMail(post.authorId, 'comment');
  }

  async newLikePost(userId: string, postId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: parseInt(userId, 10),
      },
    });
    if (!user)
      throw new NotFoundException('This user does not existe in database');
    const post = await this.prismaService.post.findUnique({
      where: {
        id: parseInt(postId,10)
      },
      select: {likes:true, id:true, author:true, authorId:true}
    });
    if (!post)
      throw new NotFoundException('This post does not existe in database');

    const likeExiste:boolean = this.checkLikes(post.likes, userId);

    if (!likeExiste) {
      const newLike = await this.prismaService.like.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    const updatePost = await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: {
        likes: {
          connect: {
            id: newLike.id,
          },
        },
      },
      select: {likes:true}
    });
    await this.sendMail(post.authorId, 'like');
    return updatePost;
  }
  else {
    const LikeId = this.findLikeId(post.likes, userId);
const updatePost = await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: {
        likes: {
          disconnect: {
            id: LikeId,
          },
        },
      },
      select: {likes:true}
    });
    await this.sendMail(post.authorId, 'like');
    return updatePost;
  }
  }

  async newLikeComment(userId: number, commentId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new NotFoundException('This user does not existe in database');
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment)
      throw new NotFoundException('This post does not existe in database');
    const newLike = await this.prismaService.like.create({
      data: {
        userId: user.id,
        commentId: comment.id,
      },
    });
  }

  async getAllPosts() {
    try {
      return await this.prismaService.post.findMany({
        select: {
          id: true,
          picture: true,
          author: true,
          authorId: true,
        },
      });

      //  const postsWithFullImageUrl = posts.map(post => ({
      //     ...post,
      //     picture: `http://localhost:8080/${post.picture}`
      //   }));
      // return postsWithFullImageUrl;
    } catch {
      throw new ForbiddenException('Something went wrong');
    }
  }

  async createSomePost() {
    await this.prismaService.post.create({
      data: {
        authorId: 0,
        author: 'Admin',
        picture: '',
        description: '',
      },
    });
  }

  async getMyPost(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: user.id,
      },
    });
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        author: true,
        authorId: true,
        description: true,
        picture: true,
        comments: true,
        likes: true,
      },
    });
    return post;
  }

  // UTILS

  private async sendMail(userId: number, theme: string) {
    //theme = like or comment
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || user.sendEmail === false) return;
    const html = `<p>Hey someone ${theme}d your post. Go check out who did it :)</p>`;
    await this.mailsService.sendMail({
      html,
      to: user.email,
      subject: `New ${theme} on your post`,
    });
  }

  private checkLikes(likes: any[], userId:string):boolean {
    return likes.some(like => like.userId === userId);
  }

  private findLikeId(likes: any[], userId: string): number | null {
  const foundLike = likes.find(like => like.userId === userId);
  return foundLike ? foundLike.id : null;
}
}
