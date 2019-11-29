export default class extends Error {
  status;
  message;
  /**
   * @param message {string} Error 가 발생시 서버에서 클라이언트에 보낼 메세지
   * @param status {number} Error 가 발생시 서버에서 클라이언트에 보낼 상태코드
   */
  constructor(message, status) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
