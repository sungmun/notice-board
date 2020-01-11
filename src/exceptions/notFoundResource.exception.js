import { BaseException } from './Base.exception';

export class NotFoundResourceException extends BaseException {
  constructor(data) {
    super(`${data}를(을) 찾을수 없습니다.`, 404);
  }
}
