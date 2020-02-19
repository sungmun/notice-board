export default {
  AuthTokenNotFound: {
    message: '로그인이 되지 않았습니다. 로그인 후 재시도 해주세요',
    status: 401,
  },
  AuthValidateToken: data => ({
    message: `${data} 토큰을 재발급 받아주세요.`,
    status: 403,
  }),
  NotFoundPath: {
    message: '존재하지 않는 URL 입니다',
    status: 404,
  },
  NotFoundResource: resourceName => ({
    message: `${resourceName}를(을) 찾을 수 없습니다`,
    status: 404,
  }),
  Validate: message => ({
    message,
    status: 400,
  }),
  DataBase: {
    message: '서버 데이터 베이스 오류입니다.',
    status: 500,
  },
  InternalServer: {
    message: '서버 오류입니다.',
    status: 500,
  },
};
