import { notFoundResource } from '../exceptions/notFoundResource.exception';
import { models } from '../models';
export class UserDao {
  model = models.User;
  async findOneByEmailOrFail(email) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) throw new notFoundResource(email);
    return user;
  }
  async findOneByIdxOrFail(idx) {
    const user = await this.model.findOne({ where: { idx } });
    if (!user) throw new notFoundResource(idx);
    return user;
  }
}
