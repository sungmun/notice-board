import { PostDao } from '../dao/post.dao';

export class PostService {
  static async getPostListPagination(offset, limit) {
    const { rows, count } = await PostDao.findAndCountAll({
      attributes: ['idx', 'name', 'email'],
      offset,
      limit,
    });
    return {
      list: rows,
      count,
    };
  }

  static async postFindById(postId) {
    const postRecord = await PostDao.findOneOrFail({ where: { id: postId } });

    const { id, title, content, hash } = postRecord.toJSON();
    return {
      id,
      title,
      content,
      hash,
    };
  }

  static async createPost(postDto, userId) {
    const postRecord = await PostDao.create({
      ...postDto,
      userId,
    });
    const { id, title, content, hash, user } = postRecord.toJSON();
    return {
      id,
      title,
      content,
      hash,
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }
}
