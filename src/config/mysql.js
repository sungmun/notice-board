import Sequelize from 'sequelize';
import config from './config.constant';

let client = null;

const createConnection = () => {
  client = new Sequelize({
    dialect: 'mysql',
    database: config.database.mysql.name,
    username: config.database.mysql.user,
    password: config.database.mysql.password,
    host: config.database.mysql.host,
  });
  return client;
};

const getClient = () => {
  if (client) return client;
  return createConnection();
};

export default {
  createConnection,
  getClient,
};
