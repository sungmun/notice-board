import Error from './Base.exception';

export class notFoundResource extends Error {
  constructor(data) {
    super(`${data}를(을) 찾을수 없습니다.`, 404);
  }
}
