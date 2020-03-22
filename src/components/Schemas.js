import { Joi } from 'celebrate';
import { BaseError, ErrorMessage } from './index';

export const pagingSchema = {
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
};
