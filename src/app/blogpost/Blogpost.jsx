/**
 * @overview Blog page
 */
import React from 'react';
import _ from 'lodash';
import moment from 'moment'
import { PostApi } from '../../../api/PostApi';
import Blogheader from '../blogheader';
import Comment from '../comment'
import CommentForm from '../commentForm';

export class Blogpost extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], post: {} };
  }

  componentDidMount() {
    PostApi.fetchPost(this.props.params.slug)
      .then((post) => {
        this.setState({ post });
        this.fetchComments(post.id);
      });
  }

  fetchComments(postId) {
    PostApi.fetchCommentsForPost(postId)
    .then((comments) => {
      this.setState({ comments });
    });
  }

  onCommentSubmit() {
    this.clearCommentReply();
    this.fetchComments(this.state.post.id);
  }

  setCommentReply(commentId) {
    this.setState({ replyTo: commentId});
  }

  clearCommentReply() {
    this.setState({ replyTo: null });
  }

  replyToComment(commentId) {
    if (this.state.replyTo === commentId) {
      return(
        <div className="comment-reply-form">
          <div className="comment-reply-header">
            <h4> Leave A Comment! </h4>
            <a className="cancel-reply" onClick={this.clearCommentReply.bind(this)}></a>
          </div>
          <CommentForm
            postId={this.state.post.id}
            parentId={commentId}
            submitCommentCallback={this.onCommentSubmit.bind(this)}
          />
        </div>
      )
    }
  }

  buildCommentTree(comment) {
    if (comment === undefined) {
      return;
    }
    const children = _.sortBy(_.filter(this.state.comments, ['parent_id', comment.id]), ['date']);
    const commentTree =
      <div className="comment-container" key={comment.id} id={'comment-' + comment.id}>
        <Comment
          id={comment.id}
          user={comment.user}
          date={comment.date}
          content={comment.content}
          replyButtonOnClick={this.setCommentReply.bind(this)}
        />
        { this.replyToComment(comment.id) }
        <div className="comment-children">
          { this.buildCommentTree(_.head(children)) }
        </div>
      </div>

    return commentTree
  }

  buildComments() {
    const sortedTopLevelComments = _.sortBy(_.filter(this.state.comments, ['parent_id', null]), ['date']);
    return sortedTopLevelComments.map((comment) =>
      this.buildCommentTree(comment)
    );
  }

  render() {
    return (
      <div className="blogpost" key={this.state.post.id}>
        <Blogheader
          title={this.state.post.title}
          author={this.state.post.author}
          date={this.state.post.publish_date}
          description={this.state.post.description}
        />
        <div className="content" dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
        <div className="comments">
          { this.buildComments() }
        </div>
        <div className="comment-form">
          <h4> Leave A Comment! </h4>
          <CommentForm
            postId={this.state.post.id}
            parentId={null}
            submitCommentCallback={this.onCommentSubmit.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Blogpost;
