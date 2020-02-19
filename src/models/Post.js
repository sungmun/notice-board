import Sequelize from 'sequelize';
import { MysqlConnect } from '../config';

import { uuidV4 } from '../utils/index.utile';
import User from './User';

export default class Post extends Sequelize.Model {
  static init(_, options) {
    return super.init(
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
          validate: { isNull: false },
        },
        hash: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: uuidV4(),
        },
        userId: {
          allowNull: false,
          type: Sequelize.NUMBER,
          references: {
            model: User,
            key: 'id',
          },
        },
      },
      {
        sequelize: MysqlConnect.getClient(),
        timestamps: true,
        paranoid: true,
      },
    );
  }

  static associate(models) {
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
