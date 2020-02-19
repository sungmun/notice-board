import { BaseError as DataBaseException } from 'sequelize';
import { isCelebrate } from 'celebrate';
import { ErrorMessage } from '../components';
import errorMessage from '../components/ErrorMessage';
import customResponse from '../components/customResponse';

export const JoiErrprHandle = (error, req, res, next) => {
  if (!isCelebrate(error)) {
    return next(error);
  }

  console.log(error);
  return next(error);
};

/**
 * @param error {Error}
 * @param req {request}
 * @param res {response}
 * @param next {function}
 * @returns {*}
 * @constructor 에러 처리 모듈로 에러의 타입이 BaseException 에러인경우 서버 오류라는 메세지를 전달한다.
 * 이 에러는 이미 파악을 하고 있으며 처리를 한 오류로 크게 문제는 되지 않는 에러에 해당한다.
 */
export function errorHandle(error, req, res) {
  switch (error.name) {
    case 'BaseError':
      return customResponse.errorResponse(res, error);
    case 'ValidationError':
      return customResponse.errorDataBaseValidation(res, error);
    case 'DataBaseException':
      return customResponse.errorResponse(res, errorMessage.DataBase);
    case 'TokenExpiredError':
      return customResponse.errorResponse(
        res,
        errorMessage.AuthValidateToken('만료된 토큰입니다.'),
      );
    default:
      return customResponse.errorResponse(res, errorMessage.InternalServer);
  }
}

// /**
//  * @param error {Error}
//  * @param req {request}
//  * @param res {response}
//  * @param next {function}
//  * @returns {*}
//  * @constructor 에러 처리 모듈로 에러의 타입이 ValidationException 에러인경우 오류메세지를 전달한다.
//  * 문제가 되는 부분중 1개만 전달해 준다.
//  */
// export function ValidationError(error, req, res, next) {
//   if (!(error instanceof ValidationException)) {
//     return next(error);
//   }
//   res.status(500).json({ message: error.errors[0].message });
//   next();
// }

/**
 * @param error {Error}
 * @param req {request}
 * @param res {response}
 * @param next {function}
 * @returns {*}
 * @constructor 에러 처리 모듈로 에러의 타입이 DatabaseError 에러인경우 서버 오류라는 메세지를 전달한다.
 * 이때 오류에 부분을 파악후 이부분에 대한 오류에 대한 메세지를 추가를 해줘야 한다.
 * 한마디로 이부분은 아직 처리하지 못한 오류를 위한 부분중 하나이다
 */
export function DataBaseError(error, req, res, next) {
  if (!(error instanceof DataBaseException)) {
    return next(error);
  }

  res.status(500).json({ message: '서버 데이터 베이스 오류입니다.' });
  next();
}

/**
 * @param error {Error}
 * @param req {request}
 * @param res {response}
 * @param next {function}
 * @returns {*}
 * @constructor 에러 처리 모듈로 에러의 타입이 DatabaseError 에러인경우 서버 오류라는 메세지를 전달한다.
 * 이때 오류에 부분을 파악후 이부분에 대한 오류에 대한 메세지를 추가를 해줘야 한다.
 * 한마디로 이부분은 아직 처리하지 못한 오류를 위한 부분중 하나이다
 */
export function Error(error, req, res, next) {
  console.log(error);
  res.status(500).json({ message: '서버 오류입니다.' });
  next();
}
