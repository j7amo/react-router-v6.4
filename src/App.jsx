import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader } from './pages/BlogPosts';

import NewPostPage from './pages/NewPost';
import PostDetailPage, { loader as postLoader } from './pages/PostDetail';
import WelcomePage from './pages/Welcome';
import RootLayout from './pages/RootLayout';

// STEP 5:
// we have to use a new kind of router - data router,- which is
// compatible with the new Data API. To create it we need to use a combination of:
// - 'createBrowserRouter' function which accepts Routes
// - 'createRoutesFromElements' function which creates Routes from Elements
const router = createBrowserRouter(
  createRoutesFromElements(
    //   STEP 6:
    // - remove all Routes definitions from 'App' function
    // - pass them to 'createRoutesFromElements'
    // -change <Routes/> component to <Route/> component
    // - set its 'path' to root path
    // - set its 'element' to element we want to render on route match
    <Route path="/" element={<RootLayout />}>
      {/* STEP 7:
       - add an 'INDEX' attribute to one of the NESTED Routes to render
       a component (page) by default */}
      <Route index element={<WelcomePage />} />
      <Route path="/blog" element={<BlogLayout />}>
        {/* STEP 3:
             - we add our previously declared and exported 'loader' function to
             the new 'loader' attribute of <Route/> component */}
        {/* When React Router evaluates this Route it will (1)call the provided loader
             function and (2)make the data returned from this function available to the
             rendered component (see the next step in BlogPostsPage.jsx ) */}
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        <Route path=":id" element={<PostDetailPage />} loader={postLoader} />
      </Route>
      <Route path="/blog/new" element={<NewPostPage />} />
    </Route>,
  ),
);

function App() {
  // STEP 8:
  // - instead of having Routes tree here and using <BrowserRouter/>,
  // we now just use a special component for working with new React Router Data API:
  // <RouterProvider />
  return <RouterProvider router={router} />;
}

export default App;
