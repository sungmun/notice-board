import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config';
import { BaseError, ErrorMessage } from '../components';

export const JwtDecoding = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new BaseError(ErrorMessage.AuthTokenNotFound);
  jsonwebtoken.verify(
    authorization.split('Bearer ')[1],
    config.jwtSecret,
    (error, decode) => {
      if (error) {
        if (error.name === 'TokenExpiredError') throw new BaseError(error);
        throw new BaseError(
          ErrorMessage.AuthValidateToken('잘못된 토큰입니다.'),
        );
      }
      req.user = decode;
      next();
    },
  );
};
