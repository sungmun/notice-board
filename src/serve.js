import App from './app';
import IndexRoute from './routes/index.route';
import UserRoute from './routes/user.route';

const app = new App([new IndexRoute(), new UserRoute()]);

app
  .listen()
  .then(() => {
    console.log(
      `🚀 App listening on the port ${process.env.PORT}, and the NODE_ENV ${process.env.NODE_ENV} `,
    );
  })
  .catch(console.log);
