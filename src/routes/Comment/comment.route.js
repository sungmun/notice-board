import { celebrate } from 'celebrate';
import { Router } from 'express';
import CommentController from '../../controllers/comment.controller';
import { JwtDecoding } from '../../middleware/auth.middleware';
import Comment from './comment.schemas';

export class CommentRoute {
  constructor() {
    this.path = '/post/:postId/comment';
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      '/',
      celebrate(Comment.get.list),
      CommentController.getPostByCommentList,
    );
    this.router.get(
      '/:commentId',
      celebrate(Comment.get.detail),
      CommentController.getCommentDetail,
    );
    this.router.post(
      '/',
      JwtDecoding,
      celebrate(Comment.post),
      CommentController.createComment,
    );
    this.router.patch(
      '/:commentId',
      JwtDecoding,
      celebrate(Comment.patch),
      CommentController.updateComment,
    );
    this.router.delete(
      '/:commentId',
      JwtDecoding,
      celebrate(Comment.delete),
      CommentController.deleteComment,
    );
  }
}
