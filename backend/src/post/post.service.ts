import { BadRequestException, Injectable } from '@nestjs/common';
import { PostDTO, commentDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Response } from 'express';



@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async newPost(file: Express.Multer.File, data: PostDTO, userId: number) {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Le dossier 'uploads' doit exister
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const uniqueFileName = new Date().getTime() + '-' + file.originalname;
    const filePath = path.join(uploadPath, uniqueFileName);
    fs.writeFileSync(filePath, file.buffer);
    await this.prismaService.post.create({
      data: {
        userId: userId,
        description: data.description,
        picture: filePath,
      },
    });
  }

  async preview(pictures: Array<Express.Multer.File>, res: Response) {
    try {
      const baseImage = sharp(pictures[0].buffer);
      const dimesions = await baseImage.metadata();
      const filterImage = sharp(pictures[1].buffer).ensureAlpha().resize({ width: dimesions.width, height: dimesions.height});
      const compositedImage = await baseImage.composite([{ input: await filterImage.toBuffer(), blend: 'overlay' }]);
      const imageBuffer = await compositedImage.toBuffer();
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(imageBuffer);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error while generating image');
    }
  }

  newComment(userId: number, comment: commentDTO) {}

  newLikeComment(userId: number, commentId: number) {}

  newLikePost(userId: number, postId: number) {}

  // UTILS

  private async resizeImage(
    baseImageBuffer: Buffer,
    overlayImageBuffer: Buffer,
  ) {
    try {
    } catch {
      throw new BadRequestException('Error while resize image');
    }
  }
}
