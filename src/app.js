import express from 'express';
import logger from 'morgan';
import { sequelize } from './models';
import { BaseError, DataBaseError, Error } from './middleware/error.middleware';
import { RouteAsyncWarp } from './middleware/RouteAsyncWarp.middleware';
import notFoundPath from './exceptions/notFoundPath.exception';

class App {
  express;
  port;
  constructor(routes) {
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

  async initializeDataBase() {
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
    this.express.use((req, res, next) => {
      throw new notFoundPath();
    });
  }

  initializeErrorHandling() {
    this.express.use(BaseError);
    //미 처리 오류
    this.express.use(DataBaseError);
    this.express.use(Error);
  }
}

export default App;
