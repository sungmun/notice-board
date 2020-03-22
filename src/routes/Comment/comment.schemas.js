import { Segments, Joi } from 'celebrate';
import { pagingSchema } from '../../components/Schemas';

const PostIdParamsSchema = {
  postId: Joi.string()
    .required()
    .label('게시물 Id'),
};
const CommentIdParamsSchema = {
  commentId: Joi.string()
    .required()
    .label('댓글 Id'),
};

const postCommentBodySchema = {
  content: Joi.string()
    .required()
    .label('댓글 내용'),
};

const CommentIdAndPostIdSchema = {
  ...PostIdParamsSchema,
  ...CommentIdParamsSchema,
};

export default {
  get: {
    list: {
      [Segments.QUERY]: Joi.object(pagingSchema),
      [Segments.PARAMS]: Joi.object(PostIdParamsSchema),
    },
    detail: {
      [Segments.PARAMS]: Joi.object(CommentIdAndPostIdSchema),
    },
  },
  post: {
    [Segments.BODY]: Joi.object(postCommentBodySchema),
    [Segments.PARAMS]: Joi.object(PostIdParamsSchema),
  },
  patch: {
    [Segments.PARAMS]: Joi.object(CommentIdAndPostIdSchema),
    [Segments.BODY]: Joi.object(postCommentBodySchema),
  },
  delete: {
    [Segments.PARAMS]: Joi.object(CommentIdAndPostIdSchema),
  },
};
