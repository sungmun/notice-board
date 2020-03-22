import { Router } from 'express';
import IndexController from '../../controllers/index.controller';

export class IndexRoute {
  constructor() {
    this.path = '';
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`/`, IndexController.index);
  }
}
