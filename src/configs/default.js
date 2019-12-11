const defaultEnv = {
  DATABASE_USERNAME: 'root',
  DATABASE_PASSWORD: '',
  DATABASE_DATABASE: 'notice-board',
  DATABASE_HOST: 'localhost',
  DATABASE_DIALECT: 'mysql',
  DATABASE_SYNC: 'true',
  NODE_ENV: 'development',
  PORT: 3000,
  PRIVATE_KEY: 'testCode',
};

process.env = { ...defaultEnv, ...process.env };
