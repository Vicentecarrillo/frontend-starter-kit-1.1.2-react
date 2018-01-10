/**
 * @overview Blog header
 */
import React from 'react';
import moment from 'moment'

export class Blogheader extends React.Component {
  render() {
    return (
      <div className="blogheader">
        <div className="inner-content">
          <div className="post-meta-data">
            <div className="meta-data-left">
              <h2> { this.props.title } </h2>
              <h5 className="blog-description">{ this.props.description } </h5>
            </div>
            <div className="meta-data-right">
              <div><b>{this.props.author}</b> </div>
              <div>{moment(this.props.publishDate).format("dddd, MMMM Do YYYY")} </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blogheader
