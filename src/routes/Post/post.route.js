import { celebrate } from 'celebrate';
import { Router } from 'express';
import PostController from '../../controllers/post.controller';
import { JwtDecoding } from '../../middleware/auth.middleware';
import Post from './post.schemas';

export class PostRoute {
  constructor() {
    this.path = '/post';
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}`,
      celebrate(Post.get.list),
      PostController.getPostListPagination,
    );
    this.router.get(
      `${this.path}/:postHash`,
      celebrate(Post.get.detail),
      PostController.getPost,
    );
    this.router.post(
      `${this.path}`,
      JwtDecoding,
      celebrate(Post.post),
      PostController.createPost,
    );
    this.router.patch(
      `${this.path}/:postHash`,
      JwtDecoding,
      celebrate(Post.post),
      PostController.updatePost,
    );
    this.router.delete(
      `${this.path}`,
      JwtDecoding,
      celebrate(Post.post),
      PostController.createPost,
    );
  }
}
