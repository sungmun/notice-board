import { celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import { JwtDecoding } from '../../middleware/auth.middleware';
import User from './user.schemas';

export class UserRoute {
  constructor() {
    this.path = '/user';
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}`,
      celebrate(User.get),
      UserController.getUserList,
    );
    this.router.post(
      `${this.path}`,
      JwtDecoding,
      celebrate(User.post),
      UserController.createUser,
    );
    this.router.post(
      `${this.path}/auth`,
      celebrate(User.auth.post),
      UserController.loginUser,
    );
  }
}
