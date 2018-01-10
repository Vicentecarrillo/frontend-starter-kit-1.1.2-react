/**
 * @overview Blog feed page
 */
import React from 'react';
import _ from 'lodash';
import { PostApi } from '../../../api/PostApi';
import Blogpost from '../blogpost';
import Blogheader from '../blogheader';

export class Blogfeed extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    PostApi.fetchPosts()
      .then((posts) => {
        this.setState({ posts: posts });
      })
      .catch(error => console.log(error));
  }

  render() {
    const sortedBlogPosts = _.reverse(_.sortBy(this.state.posts, [function(post) { return post.publish_date; }]));
    const blogPostHeaders = sortedBlogPosts.map((post) =>
      <a className="feedpostlink" href={'posts/' + post.slug} key={post.id}>
        <div className="feedpost">
          <Blogheader
            title={post.title}
            author={post.author}
            publishDate={post.publish_date}
            description={post.description}
          />
        </div>
      </a>
    );

    return (
      <div className="blogfeed">
        <h2> Blog Feed</h2>
        <div className="posts">
          { blogPostHeaders }
        </div>
      </div>
    )
  }
}

export default Blogfeed;
