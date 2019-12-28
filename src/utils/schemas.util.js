import * as Joi from '@hapi/joi';
import ValidateException from '../exceptions/Validate.exception';

const getUserQuerySchema = Joi.object({
  skip: Joi.number()
    .integer()
    .positive()
    .error(new ValidateException('skip 값은 정수를 입니다'))
    .default(0),
  task: Joi.number()
    .integer()
    .positive()
    .error(new ValidateException('task 값은 정수를 입니다'))
    .default(100),
});

const postUserBodySchema = Joi.object({
  password: Joi.string()
    .required()
    .error(new ValidateException('비밀번호를 입력해주세요')),
  name: Joi.string()
    .required()
    .error(new ValidateException('이름을 입력해주세요')),
  email: Joi.string()
    .required()
    .error(new ValidateException('이메일을 입력해주세요')),
});
const postUserAuthBodySchema = Joi.object({
  password: Joi.string()
    .required()
    .error(new ValidateException('비밀번호를 입력해주세요')),
  email: Joi.string()
    .required()
    .error(new ValidateException('이메일을 입력해주세요')),
});
export default {
  User: {
    get: {
      query: getUserQuerySchema,
    },
    post: {
      body: postUserBodySchema,
    },
    auth: {
      post: {
        body: postUserAuthBodySchema,
      },
    },
  },
};
