import { Response } from '../components';
import { UserService } from '../services/user.service';

export default class UserController {
  static async getUserList(req, res, next) {
    const { skip, task } = req.query;
    return UserService.getUserListPaging(skip, task)
      .then(Response.successRes(res))
      .catch(next);
  }

  static createUser(req, res, next) {
    const userDto = req.body;
    return UserService.createUser(userDto)
      .then(Response.createRes(res))
      .catch(next);
  }

  static loginUser(req, res, next) {
    const { email, password } = req.body;
    return UserService.loginUser(email, password)
      .then(Response.successRes(res))
      .catch(next);
  }
}
