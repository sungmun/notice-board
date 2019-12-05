const env = {
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_DATABASE: process.env.DATABASE_DATABASE || 'notice-board',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql',
  DATABASE_SYNC: process.env.DATABASE_SYNC === 'true',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};

process.env = { ...process.env, ...env };
export default env;
