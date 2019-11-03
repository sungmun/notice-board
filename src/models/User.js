import Sequelize from 'sequelize';
import { uuidV4, incoding } from '../utile/dataBaseUtil';

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: { type: Sequelize.NUMBER, primaryKey: true, allowNull: false },
        password: {
          type: Sequelize.STRING,
          validate: { notEmpty: true },
          set(val) {
            return incoding(val);
          },
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { notEmpty: true },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { isEmail: true, isNull: false },
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
    this.hasMany(models.Post, {
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

export default User;
