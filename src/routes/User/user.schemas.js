import * as Joi from '@hapi/joi';
import { Segments } from 'celebrate';
import { BaseError, ErrorMessage } from '../../components';

const getUserQuerySchema = Joi.object({
  skip: Joi.number()
    .integer()
    .positive()
    .error(new BaseError(ErrorMessage.Validate('skip 값은 정수를 입니다')))
    .default(0),
  task: Joi.number()
    .integer()
    .positive()
    .error(new BaseError(ErrorMessage.Validate('task 값은 정수를 입니다')))
    .default(100),
});

const postUserBodySchema = Joi.object({
  password: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('비밀번호를 입력해주세요'))),
  name: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('이름을 입력해주세요'))),
  email: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('이메일을 입력해주세요'))),
});
const postUserAuthBodySchema = Joi.object({
  password: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('비밀번호를 입력해주세요'))),
  email: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('이메일을 입력해주세요'))),
});
export default {
  get: {
    [Segments.QUERY]: getUserQuerySchema,
  },
  post: {
    [Segments.BODY]: postUserBodySchema,
  },
  auth: {
    post: {
      [Segments.BODY]: postUserAuthBodySchema,
    },
  },
};
