/**
 * @overview Blog comment
 */
import React from 'react';
import moment from 'moment'

export class Comment extends React.Component {
  reply(event) {
    event.preventDefault();
    this.props.replyButtonOnClick(this.props.id);
  }

  render() {
    return (
      <div className="comment">
        <div className="inner-comment">
          <div className="comment-header">
            <h4> <b>{ this.props.user }</b> says</h4>
            <div>{ moment(this.props.date).format("dddd, MMMM Do YYYY") }</div>
          </div>
          <div className="comment-content">{ this.props.content }</div>
          <a className="comment-reply-btn" rel="nofollow" href={'#comment-' + this.props.id} onClick={this.reply.bind(this)}><b>Reply</b></a>
        </div>
      </div>
    )
  }
}

export default Comment;
