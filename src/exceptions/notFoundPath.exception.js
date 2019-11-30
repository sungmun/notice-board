import Error from './Base.exception';

export default class extends Error {
  constructor() {
    super('존재하지 않는 URL 입니다', 404);
  }
}
