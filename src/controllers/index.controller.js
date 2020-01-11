// eslint-disable-next-line import/extensions
import { version } from '../../package';

export default class IndexController {
  static async index (req, res) {
    return res.status(200)
      .json({
        env: process.env.NODE_ENV,
        version,
      });
  }
}
