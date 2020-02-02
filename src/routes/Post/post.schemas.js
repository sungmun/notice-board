import { Segments, Joi } from 'celebrate';
import { BaseError, ErrorMessage } from '../../components';

const getPostQuerySchema = Joi.object({
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

const PostHashParamsSchema = Joi.object({
  postHash: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('Post 의 hash 값이 없습니다'))),
});

const DataPostBodySchema = Joi.object({
  title: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('제목을 입력해주세요.'))),
  content: Joi.string()
    .required()
    .error(new BaseError(ErrorMessage.Validate('내용을 입력해주세요'))),
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
    list: { [Segments.QUERY]: getPostQuerySchema },
    detail: { [Segments.PARAMS]: PostHashParamsSchema },
  },
  post: {
    [Segments.BODY]: DataPostBodySchema,
  },
  patch: {
    [Segments.PARAMS]: PostHashParamsSchema,
    [Segments.BODY]: DataPostBodySchema,
  },
  auth: {
    post: {
      [Segments.BODY]: postUserAuthBodySchema,
    },
  },
};
