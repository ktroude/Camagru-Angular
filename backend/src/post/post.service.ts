import { Injectable } from '@nestjs/common';
import { PostDTO, commentDTO } from './dto';

@Injectable()
export class PostService {

    constructor() {}

    newPost(file: Express.Multer.File, data: PostDTO) {

    }

    preview(pictures: Array<Express.Multer.File>) {
        
    }

    newComment(userId:number, comment: commentDTO) {

    }

    newLikeComment(userId:number, commentId:number) {

    }

    newLikePost(userId:number, postId:number) {
    
    }
}
