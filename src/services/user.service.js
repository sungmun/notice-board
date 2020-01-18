import jsonwebtoken from 'jsonwebtoken';
import { UserDao } from '../dao/user.dao';
import { NotFoundResourceException } from '../exceptions/notFoundResource.exception';

export class UserService {
  static createJWTToken (expiresIn, data) {
    return jsonwebtoken.sign(data, process.env.PRIVATE_KEY, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  static createAccessToken (data) {
    return UserService.createJWTToken('3h', data);
  }

  static getUserListPaging (offset, limit) {
    return UserDao.findAndCountAll({
      attributes: ['idx', 'name', 'email'],
      offset,
      limit,
    });
  }

  static async createUser (userDto) {
    const userRecord = await UserDao.create(userDto);
    const { id, name, email } = userRecord.toJSON();
    return {
      id,
      name,
      email,
    };
  }

  static async loginUser (email, password) {
    const userRecord = await UserDao.findOneOrFail({ where: { email } });
    const userJson = userRecord.toJSON();
    const isPassWord = UserDao.validPassword(password, userJson);
    if (!isPassWord) throw new NotFoundResourceException('password');
    const accessToken = await UserService.createAccessToken(userJson);
    return { accessToken };
  }
}
