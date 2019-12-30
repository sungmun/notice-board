import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const findEnv = config();

if (!findEnv) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  database: {
    mysql: {
      port: process.env.DATABASE_MYSQL_PORD,
      host: process.env.DATABASE_MYSQL_HOST,
      name: process.env.DATABASE_MYSQL_NAME,
      user: process.env.DATABASE_MYSQL_USER,
      password: process.env.DATABASE_MYSQL_PASSWORD,
    },
  },
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  jwtSecret: process.env.JWT_SECRET,
};
