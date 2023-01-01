import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

// if we have a component that needs data which is SLOW (bad
// connection, lots of data) and we want to load the page fast
// and show something even if data is not ready,
// we can use advanced React Router v6.4 SETUP with the help of:
// - 'defer' utility
// - <Suspense/> component
// - <Await/> component
// - 'Render props' pattern
function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      {/* defer-STEP 3:
       use <Suspense/> component to wrap <Await/> component for it to work
       and pass a JSX element to 'fallback' prop. This element will
       be rendered while data is fetching */}
      <Suspense fallback={<p>Loading blog posts... Please wait</p>}>
        {/* defer-STEP 2:
       use <Await/> component for rendering lazily loaded data
       from returning defer() from loader function:
       - pass a Promise from loaderData to 'resolve' prop
       - optionally pass a JSX element to 'errorElement' prop
       - wrap the component that waits for slowly loaded data with it */}
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error loading blog posts</p>}
        >
          {/* <Posts blogPosts={posts} /> */}
          {/* defer-STEP 4:
          use 'render props' pattern:
          in this case React Router will call this function when the data is ready
          AND pass this data automatically to the function */}
          {(posts) => <Posts blogPosts={posts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader() {
  // defer-STEP 1:
  // use 'defer'(postpone) utility function which accepts a 'data' object
  // which is usually a Promise.
  // returning it like this WILL NOT BLOCK rendering of other parts of the page,
  // and we can show some loading state with <Suspense/>
  return defer({ posts: getSlowPosts() });

  // BUT if we return like this (pay attention to AWAIT) it will block the entire page rendering
  // return defer({ posts: await getSlowPosts() });

  // we can have as many data slices as we want and decide which of them are:
  //   return defer({
  // - non-critical (the ones that the page CAN be loaded without them getting data) and as a result
  //   they CAN BE DEFERRED:
  //       quoteOfTheDay: getQuoteOfTheDay(),
  // - critical (the ones that the page should NOT be loaded without them getting data) and they CAN
  //   NOT BE DEFERRED and MUST BE AWAITED:
  //       posts: await getSlowPosts(),
  //   });
}
