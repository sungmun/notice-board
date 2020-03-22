import ErrorMessage from './ErrorMessage';
import { BaseException as BaseError } from './Base.exception';

const sendRes = (res, status) => entity => res.status(status).json(entity);

const createRes = res => sendRes(res, 201);
const successRes = res => sendRes(res, 200);
const successAndNoContentRes = res => () => res.status(204).send();

const errorResponse = (res, error) => {
  let status = 500;
  let message = 'ServerError';
  if (error.status) status = error.status;
  if (error.message) message = error.message;

  return sendRes(res, status)({ status, message });
};

const errorDataBaseValidation = (res, error) =>
  errorResponse(
    res,
    new BaseError(ErrorMessage.Validate(error.errors[0].message)),
  );

export default {
  successRes,
  createRes,
  successAndNoContentRes,
  errorDataBaseValidation,
  errorResponse,
};
