import Sequelize from 'sequelize';
import { uuidV4 } from '../utils/index.utile';
import { scryptSync } from 'crypto';

export default class User extends Sequelize.Model {
  static init(_, options) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        password: {
          type: Sequelize.CHAR(128),
          allowNull: false,
          validate: {
            notNull: { msg: '비밀번호를 입력해주세요' },
            notEmpty: { msg: '비밀번호를 입력해주세요' },
          },
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: '이름을 입력해주세요' },
            notEmpty: { msg: '이름을 입력해주세요' },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: { msg: '이미 가입된 이메일입니다.' },
          validate: {
            isEmail: { msg: '잘못된 이메일 형식입니다.' },
            notEmpty: { msg: '이메일을 입력해주세요.' },
            notNull: { msg: '이메일을 입력해주세요.' },
          },
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
        hooks: {
          beforeCreate: user => {
            user.password = this.inCodingPassword(user.password, user.hash);
          },
          beforeUpdate: user => {
            user.password = this.inCodingPassword(user.password, user.hash);
          },
        },
      },
    );
  }

  static associate(models) {
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

  static inCodingPassword(val, salt) {
    return scryptSync(val, salt, 64, { N: 1024 }).toString('hex');
  }

  static validPassword(inputPassword, { password, hash }) {
    const hashPassword = scryptSync(inputPassword, hash, 64, {
      N: 1024,
    }).toString('hex');
    return hashPassword === password;
  }
}
