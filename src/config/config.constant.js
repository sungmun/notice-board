export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database: {
    mysql: {
      port: process.env.DATABASE_MYSQL_PORD,
      host: process.env.DATABASE_MYSQL_HOST,
      name: process.env.DATABASE_MYSQL_NAME,
      user: process.env.DATABASE_MYSQL_USER,
      password: process.env.DATABASE_MYSQL_PASSWORD,
    },
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  jwtSecret: process.env.JWT_SECRET,
};
