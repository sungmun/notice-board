import { UserService } from '../services/user.service';

export default class UserController {
  service = new UserService();
  getUsers = async (req, res) => {
    const { skip, task } = req.query;
    const userList = await this.service.getUserListPaging(skip, task);
    return res.json(userList);
  };
  createUser = async (req, res) => {
    const user = await this.service.createUser(req.body);
    return res.json({ user });
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const accessToken = await this.service.loginUser(email, password);

    return res.json({ accessToken });
  };
}
