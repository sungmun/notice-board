import express from 'express';
import logger from 'morgan';
import { NotFoundPath } from './exceptions/notFoundPath.exception';
import { BaseError, DataBaseError, Error, ValidationError } from './middleware/error.middleware';
import { RouteAsyncWarp } from './middleware/RouteAsyncWarp.middleware';
import { sequelize } from './models';

class App {
  constructor (routes) {
    this.express = express();
    this.port = process.env.PORT;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  async listen() {
    this.express.listen(this.port);
    await this.initializeDataBase();
  }

  static async initializeDataBase () {
    if (process.env.DATABASE_SYNC) {
      return sequelize.sync();
    }
    return sequelize;
  }

  getServer() {
    return this.express;
  }

  initializeMiddleware() {
    this.express.use(logger('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(routes) {
    routes.forEach(route => {
      this.express.use('/', RouteAsyncWarp(route.router));
    });
    this.express.use(() => {
      throw new NotFoundPath();
    });
  }

  initializeErrorHandling() {
    this.express.use(BaseError);
    this.express.use(ValidationError);
    // 미 처리 오류
    this.express.use(DataBaseError);
    this.express.use(Error);
  }
}

export default App;
