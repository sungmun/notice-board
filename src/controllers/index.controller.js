export default class IndexController {
  index = async (req, res) => {
    return res.status(200).json({
      env: process.env.NODE_ENV,
      version: require('../../package').version,
    });
  };
}
