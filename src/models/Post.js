import Sequelize from 'sequelize';

import { uuidV4 } from '../utils/index.utile';

export default class Post extends Sequelize.Model {
  static init(_, options) {
    return super.init(
      {
        idx: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
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
      {
        sequelize: options.sequelize,
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