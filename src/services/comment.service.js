import _ from 'lodash';
import { BaseError, ErrorMessage } from '../components';
import { CommentDao } from '../dao/comment.dao';
// import { ErrorMessage, BaseError } from '../components';
// import Config from '../config';

export class CommentService {
  static async getCommentListPaging(postId, offset, limit) {
    const {
      rows: commentRecordList,
      count,
    } = await CommentDao.findPagingCommentAndUserPostId({
      postId,
      attributes: ['content', 'id'],
      offset,
      limit,
    });

    return {
      list: commentRecordList.map(commentRecord =>
        _.pick(commentRecord, ['id', 'content', 'User']),
      ),
      count,
    };
  }

  static async getCommentDetail(commentId) {
    const commentRecord = await CommentDao.findOneCommentAndUserByCommentOrFail(
      commentId,
    );

    return _.pick(commentRecord, ['id', 'content', 'User']);
  }

  static async createComment({ content, userHash, postId }) {
    const commentRecord = await CommentDao.create({
      content,
      userHash,
      postId,
    });
    return _.pick(commentRecord, ['id', 'content', 'user']);
  }

  static async updateComment({ commentId, content }) {
    const [changeRowCount] = await CommentDao.update(
      { content },
      {
        where: { id: commentId },
      },
    );
    if (changeRowCount < 1) {
      throw new BaseError(ErrorMessage.NotFoundResource('Comment'));
    }
  }

  static async deleteComment(commentId) {
    const destroyRowCount = await CommentDao.destroy({
      where: { id: commentId },
    });

    if (destroyRowCount < 1) {
      throw new BaseError(ErrorMessage.NotFoundResource('Comment'));
    }
  }
}
