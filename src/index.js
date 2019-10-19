import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.listen(3000, () => {
  console.log('server start');
});

export default app;
