import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';

class Database {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._sequelize = new Sequelize({
      dialect: 'mysql',
      database: config.database.mysql.name,
      username: config.database.mysql.user,
      password: config.database.mysql.password,
      host: config.database.mysql.host,
    });
    // eslint-disable-next-line no-underscore-dangle
    this._models = {};

    // Load each model file
    const models = Object.assign(
      {},
      ...fs
        .readdirSync(__dirname)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
        .map(file => {
          // eslint-disable-next-line global-require,import/no-dynamic-require
          const model = require(path.join(__dirname, file)).default;

          return {
            [model.name]: model.init(null, { sequelize: this._sequelize }),
          };
        }),
    );

    // Load model associations
    // eslint-disable-next-line no-restricted-syntax
    for (const model of Object.keys(models)) {
      // eslint-disable-next-line no-unused-expressions
      typeof models[model].associate === 'function' &&
        models[model].associate(models);
    }

    this._models = models;
  }

  get sequelize() {
    return this._sequelize;
  }

  get models() {
    return this._models;
  }
}

const database = new Database();

export const { models } = database;
export const { sequelize } = database;
