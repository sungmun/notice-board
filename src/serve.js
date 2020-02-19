import App from './app';
import { IndexRoute, UserRoute, PostRoute } from './routes';

const app = new App([new IndexRoute(), new UserRoute(), new PostRoute()]);

app
  .listen()
  .then(() => {
    console.log(
      `🚀 App listening on the port ${process.env.PORT}, and the NODE_ENV ${process.env.NODE_ENV} `,
    );
  })
  .catch(console.error);
