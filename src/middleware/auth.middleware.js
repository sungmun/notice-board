import jsonwebtoken from 'jsonwebtoken';
import Config from '../config';
import { BaseError, ErrorMessage } from '../components';

export const JwtDecoding = (req, res, next) => {
  const authentication = req.get('authentication');
  if (!authentication) throw new BaseError(ErrorMessage.AuthTokenNotFound);
  jsonwebtoken.verify(authentication, Config.jwtSecret, (error, decode) => {
    if (error) {
      if (error.name === 'TokenExpiredError') throw new BaseError(error);
      throw new BaseError(ErrorMessage.AuthValidateToken('잘못된 토큰입니다.'));
    }
    req.user = decode;
    next();
  });
};
