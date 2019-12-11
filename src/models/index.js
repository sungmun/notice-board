import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

const config = process.env;

class Database {
  constructor() {
    this._sequelize = new Sequelize({
      dialect: config.DATABASE_DIALECT,
      database: config.DATABASE_DATABASE,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      host: config.DATABASE_HOST,
    });
    this._models = {};

    // Load each model file
    const models = Object.assign(
      {},
      ...fs
        .readdirSync(__dirname)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
        .map(file => {
          const model = require(path.join(__dirname, file)).default;

          return {
            [model.name]: model.init(null, { sequelize: this._sequelize }),
          };
        }),
    );

    // Load model associations
    for (const model of Object.keys(models)) {
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

export const models = database.models;
export const sequelize = database.sequelize;
