import express from 'express';
import morgan from 'morgan';
import router from './router';

const port = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(morgan('dev'));

app.use(router);

app.listen(port, () => {
  console.log('server start');
});

export default app;
