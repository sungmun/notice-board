import { Response } from '../components';
import { CommentService } from '../services/comment.service';

export default class CommentController {
  static getPostByCommentList(req, res, next) {
    const { postId } = req.params;
    console.debug(postId);
    return CommentService.getCommentListPaging(postId)
      .then(Response.successRes(res))
      .catch(next);
  }

  static getCommentDetail(req, res, next) {
    const { commentId } = req.params;

    return CommentService.getCommentDetail(commentId)
      .then(Response.successRes(res))
      .catch(next);
  }

  static createComment(req, res, next) {
    const { postId } = req.params;
    const { content } = req.body;
    const { hash } = req.user;
    return CommentService.createComment({ content, userHash: hash, postId })
      .then(Response.successRes(res))
      .catch(next);
  }

  static updateComment(req, res, next) {
    const { content } = req.body;
    const { commentId } = req.params;

    return CommentService.updateComment({ content, commentId })
      .then(data => {
        console.debug('-=-=-=-=-=-');
        return data;
      })
      .then(Response.successAndNoContentRes(res))
      .catch(next);
  }

  static deleteComment(req, res, next) {
    const { commentId } = req.params;

    return CommentService.deleteComment(commentId)
      .then(Response.successAndNoContentRes(res))
      .catch(next);
  }
}
