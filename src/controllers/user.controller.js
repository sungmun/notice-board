import { UserService } from '../services/user.service';

export default class UserController {
  static async getUserList(req, res) {
    const { skip, task } = req.query;
    const result = await UserService.getUserListPaging(skip, task);
    return res.json(result);
  }

  static async createUser(req, res) {
    const userDto = req.body;
    const user = await UserService.createUser(userDto);
    return res.status(201).json({ user });
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    return res.json(result);
  }
}
