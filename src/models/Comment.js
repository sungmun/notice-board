import Sequelize from 'sequelize';
import { uuidV4 } from '../utile/dataBaseUtil';

class Comment extends Sequelize.Model {
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
    this.belongsTo(models.Post, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    this.hasMany(models.Comment, {
      as: 'child',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    this.belongsTo(models.Comment, {
      as: 'parent',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

export default Comment;
