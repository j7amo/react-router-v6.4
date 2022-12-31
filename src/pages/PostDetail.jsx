import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

function PostDetailPage() {
  const [error, setError] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPost();
  }, [id]);

  return (
    <>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && <BlogPost title={post.title} text={post.body} />}
    </>
  );
}

export default PostDetailPage;
