import { BaseException } from './Base.exception';

export class NotFoundPath extends BaseException {
  constructor() {
    super('존재하지 않는 URL 입니다', 404);
  }
}
