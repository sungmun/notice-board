import App from './app';
import indexRoute from './routes/index.route';
import userRoute from './routes/user.route';

const app = new App([new indexRoute(), new userRoute()]);

app
  .listen()
  .then(() => {
    console.log(
      `🚀 App listening on the port ${process.env.PORT}, and the NODE_ENV ${process.env.NODE_ENV} `,
    );
  })
  .catch(console.log);
