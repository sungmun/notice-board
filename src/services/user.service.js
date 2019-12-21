import { models } from '../models';
import jwt from 'jsonwebtoken';
import { notFoundResource } from '../exceptions/notFoundResource.exception';

export class UserService {
  model = models.User;

  async createJWTToken(expiresIn, data) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        data,
        process.env.PRIVATE_KEY,
        { expiresIn, algorithm: 'HS256' },
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        },
      ),
    );
  }

  createAccessToken(data) {
    return this.createJWTToken('3h', data);
  }

  getUserListPaging(offset, limit) {
    return this.model.findAndCountAll({
      attributes: ['idx', 'name', 'email'],
      offset,
      limit,
    });
  }

  async createUser(data = { password, email, name }) {
    const user = await this.model.create(data);
    const {
      updatedAt,
      createdAt,
      deletedAt,
      password,
      hash,
      ...result
    } = user.toJSON();
    return result;
  }

  async loginUser(email, password) {
    const user = await this.model.findOneByEmailOrFail(email);
    const isPassWord = this.model.validPassword(password, user.toJSON());
    if (!isPassWord) throw new notFoundResource('password');
    return await this.createAccessToken(user.toJSON());
  }
}
