import { PostService } from '../services/post.service';
import { Response } from '../components';

export default class PostController {
  static getPostListPagination(req, res, next) {
    const { skip, task } = req.query;
    return PostService.getPostListPagination(skip, task)
      .then(Response.successRes(res))
      .catch(next);
  }

  static getPost(req, res, next) {
    const { postId } = req.params;
    return PostService.postFindById(postId)
      .then(Response.successRes(res))
      .catch(next);
  }

  static createPost(req, res, next) {
    const postDto = req.body;
    const userId = req.user.id;
    return PostService.createPost(postDto, userId)
      .then(Response.createRes(res))
      .catch(next);
  }

  static updatePost(req, res, next) {
    const postDto = req.body;
    const { postHash } = req.params;
    return PostService.updatePost(postDto, postHash)
      .then(Response.successRes(res))
      .catch(next);
  }
}
