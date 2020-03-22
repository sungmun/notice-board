import _ from 'lodash';

import { BaseError, ErrorMessage } from '../components';
import { PostDao } from '../dao/post.dao';

export class PostService {
  static async getPostListPagination(offset, limit) {
    const { rows: list, count } = await PostDao.findAndCountAll({
      attributes: ['id', 'title', 'content', 'hash'],
      offset,
      limit,
    });
    return {
      list,
      count,
    };
  }

  static async postFindByHash(hash) {
    const postRecord = await PostDao.findOneOrFail({ where: { hash } });

    return _.pick(postRecord, ['id', 'title', 'content', 'hash']);
  }

  static async createPost(postDto, userHash) {
    const postRecord = await PostDao.create({
      ...postDto,
      userHash,
    });

    return _.pick(postRecord, ['id', 'title', 'content', 'hash', 'user']);
  }

  static async updatePost(postDto, postHash) {
    const [changeRowCount] = await PostDao.update(postDto, {
      where: { hash: postHash },
      returning: true,
    });

    if (changeRowCount < 1) {
      throw new BaseError(ErrorMessage.NotFoundResource('Post'));
    }
    
  }

  static async deletePost(hash) {
    await PostDao.destroy({ where: { hash } });
  }
}
