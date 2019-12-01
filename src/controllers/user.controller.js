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
}
