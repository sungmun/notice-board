import _ from 'lodash';

import { BaseError, ErrorMessage } from '../components';
import { PostDao } from '../dao/post.dao';

export class PostService {
  static async getPostListPagination(offset, limit) {
    const { rows: list, count } = await PostDao.findAndCountAll({
      attributes: ['idx', 'name', 'email'],
      offset,
      limit,
    });
    return {
      list,
      count,
    };
  }

  static async postFindById(postId) {
    const postRecord = await PostDao.findOneOrFail({ where: { id: postId } });

    return { ..._.pick(postRecord, ['id', 'title', 'content', 'hash']) };
  }

  static async createPost(postDto, userId) {
    const postRecord = await PostDao.create({
      ...postDto,
      userId,
    });
    return _.pick(postRecord, ['id', 'title', 'content', 'hash', 'user']);
  }

  static async updatePost(postDto, postHash) {
    const [changeRowCount, postRecord] = await PostDao.update(postDto, {
      where: { hash: postHash },
    });
    if (changeRowCount < 1) {
      throw new BaseError(ErrorMessage.NotFoundResource('Post'));
    }
    return _.pick(postRecord, ['id', 'title', 'content', 'hash']);
  }
}
