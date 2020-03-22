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
    const { hash } = req.params;
    return PostService.postFindByHash(hash)
      .then(Response.successRes(res))
      .catch(next);
  }

  static createPost(req, res, next) {
    const postDto = req.body;
    const userHash = req.user.hash;
    return PostService.createPost(postDto, userHash)
      .then(Response.createRes(res))
      .catch(next);
  }

  static updatePost(req, res, next) {
    const postDto = req.body;
    const { hash } = req.params;
    return PostService.updatePost(postDto, hash)
      .then(Response.successAndNoContentRes(res))
      .catch(next);
  }

  static deletePost(req, res, next) {
    const { hash } = req.params;
    return PostService.deletePost(hash)
      .then(Response.successAndNoContentRes(res))
      .catch(next);
  }
}
