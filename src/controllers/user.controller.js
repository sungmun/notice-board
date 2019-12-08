import { models } from '../models';

export default class UserController {
  User = models.User;
  getUsers = async (req, res) => {
    const { skip, task } = req.query;
    const userList = await this.User.findAndCountAll({
      offset: skip,
      limit: task,
    });
    return res.json(userList);
  };
  createUser = async (req, res) => {
    const user = await this.User.create({
      ...req.body,
    });

    const { password, updatedAt, createdAt, ...result } = user.toJSON();
    return res.json({ user: { ...result } });
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.User.findOne({ where: { email } });
    const isPassword = await this.User.validPassword(
      password,
      user.get('password'),
      user.get('hash'),
    );

    if (isPassword) return res.json({ success: true });
    return res.json({ success: false });
  };
}
