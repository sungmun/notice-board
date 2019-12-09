import { Router } from 'express';
import UserController from '../controllers/user.controller';

export default class userRoute {
  path = '/user';
  router = Router();
  userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.post(`${this.path}`, this.userController.createUser);
    this.router.post(`${this.path}/auth`, this.userController.loginUser);
  }
}
