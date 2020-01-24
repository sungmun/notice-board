import { NotFoundResourceException } from '../exceptions/notFoundResource.exception';
import { models } from '../models';

export class PostDao extends models.Post {
  static async findOneOrFail(option) {
    const postRecord = await PostDao.findOne(option);
    if (!postRecord) throw new NotFoundResourceException('PostRecord');
    return postRecord;
  }
}
