import { Segments, Joi } from 'celebrate';
import { pagingSchema } from '../../components/Schemas';

const postUserBodySchema = {
  password: Joi.string()
    .required()
    .label('비밀번호'),
  name: Joi.string()
    .required()
    .label('이름'),
  email: Joi.string()
    .required()
    .label('이메일'),
};

const postUserAuthBodySchema = {
  password: Joi.string()
    .required()
    .label('비밀번호'),
  email: Joi.string()
    .required()
    .label('이메일'),
};

export default {
  get: {
    [Segments.QUERY]: Joi.object(pagingSchema),
  },
  post: {
    [Segments.BODY]: Joi.object(postUserBodySchema),
  },
  auth: {
    post: {
      [Segments.BODY]: Joi.object(postUserAuthBodySchema),
    },
  },
};
