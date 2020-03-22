import { celebrate } from 'celebrate';
import { Router } from 'express';
import PostController from '../../controllers/post.controller';
import { JwtDecoding } from '../../middleware/auth.middleware';
import Post from './post.schemas';

export class PostRoute {
  constructor() {
    this.path = '/post';
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      '/',
      celebrate(Post.get.list),
      PostController.getPostListPagination,
    );
    this.router.get(
      '/:hash',
      celebrate(Post.get.detail),
      PostController.getPost,
    );
    this.router.post(
      '/',
      JwtDecoding,
      celebrate(Post.post),
      PostController.createPost,
    );
    this.router.patch(
      '/:hash',
      JwtDecoding,
      celebrate(Post.patch),
      PostController.updatePost,
    );
    this.router.delete(
      '/:hash',
      JwtDecoding,
      celebrate(Post.delete),
      PostController.deletePost,
    );
  }
}
