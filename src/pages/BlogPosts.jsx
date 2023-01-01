import React from 'react';

import { useLoaderData } from 'react-router-dom';
import Posts from '../components/Posts';
import { getPosts } from '../util/api';

function BlogPostsPage() {
  // 4) This is the next step of switching from 'old' approach:
  // to get the data that becomes available as a result of calling a 'loader;
  // defined for the current Route, we use a special hook - useLoaderData
  // And that's it! Or not??? Somehow it is not working...
  // It turns out that the 'old' <BrowserRouter> (and all others) CANNOT
  // USE the new Data API of the Browser Router v6.4 (see the next step
  // in App.jsx)
  const posts = useLoaderData();
  // this is a typical approach for showing some remote data to the user:
  // 1) we create state slices:
  // - for managing ERRORS (this is used for conditional rendering)
  // - for managing LOADING STATE (this is used for conditional rendering)
  // - for managing the data itself (this is used for rendering the data)
  // 2) we use useEffect with empty dependencies array to do all
  // the fetching work ON COMPONENT MOUNT.
  // 3) The work itself is done by async function which typically:
  // - sets LOADING state to TRUE
  // - fetches DATA
  // - sets DATA if no error OR sets ERROR if error is present
  // - sets LOADING state to FALSE in the end
  // const [error, setError] = useState();
  // const [posts, setPosts] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  //
  // useEffect(() => {
  //   async function loadPosts() {
  //     setIsLoading(true);
  //     try {
  //       const postsData = await getPosts();
  //       setPosts(postsData);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }
  //
  //   loadPosts();
  // }, []);

  return (
    <>
      {/* we render different content based on state */}
      <h1>Our Blog Posts</h1>
      {/* {isLoading && <p>Loading posts...</p>} */}
      {/* {error && <p>{error}</p>} */}
      {/* {!error && posts && <Posts blogPosts={posts} />} */}
      <Posts blogPosts={posts} />
    </>
  );
}

// with React Router v6.4 we can REMOVE ALL THE 'TYPICAL APPROACH' CODE!
// instead we do the following:
// 1) we declare a function which should either return data OR throw an error.
// 2) we go to the current Route definition (see the next step at App.jsx)
export function loader() {
  return getPosts();
}

export default BlogPostsPage;
