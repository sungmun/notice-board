import Sequelize from 'sequelize';
import { MysqlConnect } from '../config';
import config from '../config/config.constant';
import { uuidV4 } from '../utils/index.utile';

class Post extends Sequelize.Model {}

Post.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      validate: { notEmpty: true },
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    hash: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidV4(),
    },
    userHash: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'hash',
      },
    },
  },
  {
    indexes: [{ fields: ['hash'] }],
    sequelize: MysqlConnect.getClient(),
    timestamps: true,
    paranoid: true,
  },
);

// Post.belongsTo(User, {
//   onDelete: 'CASCADE',
//   foreignKey: {
//     allowNull: false,
//   },
// });
// Post.hasMany(Comment, {
//   onDelete: 'CASCADE',
//   foreignKey: {
//     allowNull: false,
//   },
// });
if (config.database.mysql.configSync) Post.sync();
export default Post;
