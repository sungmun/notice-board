import express from 'express';
import logger from 'morgan';
import { ErrorMessage } from './components';
import { BaseException } from './components/Base.exception';
import { MysqlConnect, config } from './config';
import {
  errorHandle,
  JoiErrorHandle,
  databaseErrorHandle,
} from './middleware/error.middleware';

class App {
  constructor(routes) {
    this.express = express();
    this.port = process.env.PORT;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  async listen() {
    this.express.listen(this.port);
    await App.initializeDataBase();
  }

  static async initializeDataBase() {
    if (config.database.mysql.configSync) {
      return MysqlConnect.createConnection().sync();
    }
    return MysqlConnect.createConnection();
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
    routes.forEach(controller => {
      this.express.use(controller.path, controller.router);
    });
    this.express.use(() => {
      throw new BaseException(ErrorMessage.NotFoundPath);
    });
  }

  initializeErrorHandling() {
    this.express.use(JoiErrorHandle);
    this.express.use(databaseErrorHandle);
    this.express.use(errorHandle);
  }
}

export default App;
