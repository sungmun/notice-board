import _ from 'lodash';
import jsonwebtoken from 'jsonwebtoken';
import { UserDao } from '../dao/user.dao';
import { ErrorMessage, BaseError } from '../components';
import Config from '../config';

export class UserService {
  static createJWTToken(expiresIn, data) {
    return jsonwebtoken.sign(data, Config.jwtSecret, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  static createAccessToken(data) {
    return UserService.createJWTToken('3h', data);
  }

  static getUserListPaging(offset, limit) {
    return UserDao.findAndCountAll({
      attributes: ['idx', 'name', 'email', 'hash'],
      offset,
      limit,
    });
  }

  static async createUser(userDto) {
    const userRecord = await UserDao.create(userDto);
    return _.pick(userRecord, ['id', 'name', 'email', 'hash']);
  }

  static async loginUser(email, password) {
    const userRecord = await UserDao.findOneOrFail({ where: { email } });
    const isPassWord = userRecord.correctPassword(password);
    if (!isPassWord) {
      throw new BaseError(ErrorMessage.NotFoundResource('PassWord'));
    }
    const accessToken = await UserService.createAccessToken(userRecord);
    return { accessToken };
  }
}
