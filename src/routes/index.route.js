import { Router } from 'express';
import IndexController from '../controllers/index.controller';

export default class IndexRoute {
  constructor() {
    this.path = '/';
    this.router = Router();
    this.indexController = new IndexController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
