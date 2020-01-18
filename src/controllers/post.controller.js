import { PostService } from '../services/post.service';

export default class UserController {
  static async getPostListPagination(req, res) {
    const { skip, task } = req.query;
    const result = await PostService.getPostListPagination(skip, task);
    return res.json(result);
  }

  static async getPost(req, res) {
    const { postId } = req.params;
    const userList = await PostService.postFindById(postId);
    return res.json(userList);
  }

  static async createPost(req, res) {
    const postDto = req.body;
    const userId = req.user.id;
    const result = await PostService.createPost(postDto, userId);
    return res.status(201).json(result);
  }
}
