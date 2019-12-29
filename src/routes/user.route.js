import { Router } from 'express';
import UserController from '../controllers/user.controller';
import routeValidate from '../middleware/routeValidate.middleware';
import schemas from '../utils/schemas.util';
export default class userRoute {
  path = '/user';
  router = Router();
  userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.validateGetUser,
      this.userController.getUsers,
    );
    this.router.post(
      `${this.path}`,
      this.validatePostUser,
      this.userController.createUser,
    );
    this.router.post(
      `${this.path}/auth`,
      this.validatePostUserAuth,
      this.userController.loginUser,
    );
  }

  validateGetUser(req, res, next) {
    routeValidate(schemas.User.get, req);
    next();
  }
  validatePostUser(req, res, next) {
    routeValidate(schemas.User.post, req);
    next();
  }
  validatePostUserAuth(req, res, next) {
    routeValidate(schemas.User.auth.post, req);
    next();
  }
}
