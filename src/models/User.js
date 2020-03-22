/* eslint-disable no-param-reassign */
import { randomBytes, createHash } from 'crypto';
import Sequelize from 'sequelize';
import { MysqlConnect } from '../config';
import config from '../config/config.constant';
import { uuidV4 } from '../utils/index.utile';

class User extends Sequelize.Model {
  static generateSalt() {
    return randomBytes(16).toString('base64');
  }

  static encryptPassword(plainText, salt) {
    return createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  }

  static setSaltAndPassword(user) {
    if (!user.changed('password')) return;
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(
      user.get('password'),
      user.get('salt'),
    );
  }

  correctPassword(enteredPassword) {
    return (
      User.encryptPassword(enteredPassword, this.get('salt')) ===
      this.get('password')
    );
  }
}

User.init(
  {
    id: {
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
      get() {
        return this.getDataValue(`password`);
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
    salt: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: uuidV4(),
      get() {
        return this.getDataValue(`salt`);
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

if (config.database.mysql.configSync) User.sync();

User.addHook('beforeCreate', User.setSaltAndPassword);
User.addHook('beforeUpdate', User.setSaltAndPassword);

export default User;
