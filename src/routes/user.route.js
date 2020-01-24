import { celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import schemas from '../utils/schemas.util';

export default class userRoute {
  constructor() {
    this.path = '/user';
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}`,
      celebrate(schemas.User.get),
      this.userController.getUserList,
    );
    this.router.post(
      `${this.path}`,
      celebrate(schemas.User.post),
      this.userController.createUser,
    );
    this.router.post(
      `${this.path}/auth`,
      celebrate(schemas.User.auth.post),
      this.userController.loginUser,
    );
  }
}
