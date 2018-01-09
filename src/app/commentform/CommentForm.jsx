/**
 * @overview Blog comment form
 */
import React from 'react';
import { PostApi } from '../../../api/PostApi';

export class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment: '', username: ''};
  }

  handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  postComment(event) {
    event.preventDefault();
    PostApi.postComment(this.props.postId, this.props.parentId, this.state.username, Date.now(), this.state.comment)
    .then(() => this.props.submitCommentCallback());
    this.setState({comment: ""});
    this.setState({username: ""});
  }

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.postComment.bind(this)}>
          <textarea name="comment" cols="45" rows="8" value={this.state.comment} onChange={this.handleCommentChange.bind(this)} />
          <p className="comment-form-username">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" size="30" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          </p>
          <p className="form-submit">
            <input className="btn comment-submit" type="submit" value="Submit" />
          </p>
        </form>
      </div>
    );
  }
}

export default CommentForm;
