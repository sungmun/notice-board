import { BaseError, ErrorMessage } from '../components';
import { Post } from '../models';

export class PostDao extends Post {
  static async findOneOrFail(option) {
    const postRecord = await PostDao.findOne(option);
    if (!postRecord) throw new BaseError(ErrorMessage.NotFoundResource('post'));
    return postRecord;
  }
}
