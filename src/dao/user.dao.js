import { scryptSync } from 'crypto';
import { NotFoundResourceException } from '../exceptions/notFoundResource.exception';
import { models } from '../models';

export class UserDao extends models.User {
  static async findOneOrFail (option) {
    const user = await UserDao.findOne(option);
    if (!user) throw new NotFoundResourceException(user);
    return user;
  }

  static inCodingPassword (val, salt) {
    return scryptSync(val, salt, 64, { N: 1024 })
      .toString('hex');
  }

  static validPassword (inputPassword, { password, hash }) {
    const hashPassword = scryptSync(inputPassword, hash, 64, {
      N: 1024,
    })
      .toString('hex');
    return hashPassword === password;
  }
}
