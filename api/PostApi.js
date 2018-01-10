import _ from 'lodash';
import moment from 'moment'

const baseUrl = 'http://localhost:9001';
const postsUrl = `${baseUrl}/posts`;
const allCommentsUrl = `${baseUrl}/comments`;

const fetchPosts = () => {
  return fetch(postsUrl)
    .then((response) => (response.json()))
    .catch(error => error);
};

const fetchPost = (slug) => {
  var promise = new Promise((resolve, reject) => {
    fetchPosts().then((posts) => {
      var post = _.find(posts, { "slug": slug });
      if (post !== undefined) {
        resolve(post)
      } else {
        reject("post not found")
      };
    });
  });

  return promise;
};

const fetchComments = () => {
  return fetch(allCommentsUrl)
    .then((response) => (response.json()));
};

const postComment = (postId, parentId, username, date, content) => {
  return fetchComments().then(comments => {
    const comment = {
      "id": comments.length + 1,
      "postId": postId,
      "parent_id": parentId,
      "user": username,
      "date": moment(date).format("YYYY-MM-DD"),
      "content": content
    }

    const commentsUrl = `${postsUrl}/${postId}/comments`;
    var myHeaders = new Headers({"Content-Type": "application/json"});
    return fetch(commentsUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(comment)
    })
    .then((response) => (response.json()))
    .catch(error => console.log(error))
  });
}

const fetchCommentsForPost = (postId) => {
  const commentsUrl = `${postsUrl}/${postId}/comments`;
  return fetch(commentsUrl)
    .then((response) => (response.json()));
}

export const PostApi = {
  fetchPosts,
  fetchPost,
  fetchCommentsForPost,
  postComment
};
