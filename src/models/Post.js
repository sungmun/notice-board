import Sequelize from 'sequelize';
import { uuidV4 } from '../utile/dataBaseUtil';

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: { type: Sequelize.NUMBER, primaryKey: true, allowNull: false },
        title: {
          type: Sequelize.STRING,
          validate: { notEmpty: true },
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: { isNull: false },
        },
        hash: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: uuidV4(),
        },
      },
      { sequelize, timestamps: true },
    );
  }

  static associations(models) {
    this.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    this.hasMany(models.Comment, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

export default Post;
