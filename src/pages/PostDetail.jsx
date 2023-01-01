import React from 'react';
import { useLoaderData } from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

// now when we have a working setup for using Data API of React Router v6.4
// we can refactor this component too
function PostDetailPage() {
  const post = useLoaderData();

  return <BlogPost title={post.title} text={post.body} />;
}

// Here we have to somehow get the 'id' of the post that we want to fetch.
// It turns out that React Router Data API automatically passes an object
// to a user-defined loader which we pass to 'loader' prop of <Route/> component.
// So we now just do some destructuring and get 'params' OBJECT which
// in turn has our post 'id' property:
export function loader({ params }) {
  const postId = params.id;

  return getPost(postId);
}

export default PostDetailPage;
