import Sequelize from 'sequelize';
import config from '../config/config.constant';
import { uuidV4 } from '../utils/index.utile';
import { MysqlConnect } from '../config';

class Comment extends Sequelize.Model {}

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: { notNull: true },
    },
    hash: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidV4(),
    },
    userHash: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'hash',
      },
    },
    postId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
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
// Comment.belongsTo(User, {
//   onDelete: 'CASCADE',
//   foreignKey: {
//     allowNull: false,
//   },
// });
//
// Comment.belongsTo(Post, {
//   onDelete: 'CASCADE',
//   foreignKey: {
//     allowNull: false,
//   },
// });
//
Comment.hasMany(Comment, {
  as: 'child',
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: true,
  },
});

Comment.belongsTo(Comment, {
  as: 'parent',
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: true,
  },
});
if (config.database.mysql.configSync) Comment.sync();

export default Comment;
