import { Router } from 'express';
import IndexController from '../controllers/index.controller';

export default class IndexRoute {
  path = '/';
  router = Router();
  indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
