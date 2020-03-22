import { Segments, Joi } from 'celebrate';
import { pagingSchema } from '../../components/Schemas';

const PostHashParamsSchema = {
  hash: Joi.string()
    .required()
    .label('게시물 Hash'),
};

const DataPostBodySchema = {
  title: Joi.string()
    .required()
    .label('개시물 제목(title)'),

  // .error(new BaseError(ErrorMessage.Validate('제목을 입력해주세요.'))),
  content: Joi.string()
    .required()
    .label('개시물 내용(content)'),
};

export default {
  get: {
    list: { [Segments.QUERY]: Joi.object(pagingSchema) },
    detail: { [Segments.PARAMS]: Joi.object(PostHashParamsSchema) },
  },
  post: {
    [Segments.BODY]: Joi.object(DataPostBodySchema),
  },
  patch: {
    [Segments.PARAMS]: Joi.object(PostHashParamsSchema),
    [Segments.BODY]: Joi.object(DataPostBodySchema),
  },
  delete: {
    [Segments.PARAMS]: Joi.object(PostHashParamsSchema),
  },
};
