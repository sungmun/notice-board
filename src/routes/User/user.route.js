import { celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import User from './user.schemas';

export class UserRoute {
  constructor() {
    this.path = '/user';
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', celebrate(User.get), UserController.getUserList);
    this.router.post('/', celebrate(User.post), UserController.createUser);
    this.router.post(
      '/auth',
      celebrate(User.auth.post),
      UserController.loginUser,
    );
  }
}
