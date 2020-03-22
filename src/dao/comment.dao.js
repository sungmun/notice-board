import { BaseError, ErrorMessage } from '../components';
import { Comment, User } from '../models';

export class CommentDao extends Comment {
  static async findOneCommentAndUserByCommentId(commentId) {
    CommentDao.belongsTo(User, { foreignKey: 'userHash', targetKey: 'hash' });
    return CommentDao.findOne({
      where: { Id: commentId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
  }

  static async findOneCommentAndUserByCommentOrFail(commentId) {
    const commentRecord = await CommentDao.findOneCommentAndUserByCommentId(
      commentId,
    );
    if (!commentId) {
      throw new BaseError(ErrorMessage.NotFoundResource('comment'));
    }
    return commentRecord;
  }

  static async findPagingCommentAndUserPostId({
    postId,
    limit,
    offset,
    attributes,
  }) {
    CommentDao.belongsTo(User, { foreignKey: 'userHash', targetKey: 'hash' });
    return CommentDao.findAndCountAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      where: { postId },
      attributes,
      offset,
      limit,
    });
  }
}
