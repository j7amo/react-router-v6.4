import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';

import NewPostPage, { action as newPostAction } from './pages/NewPost';
import PostDetailPage, { loader as postLoader } from './pages/PostDetail';
import WelcomePage from './pages/Welcome';
import RootLayout from './pages/RootLayout';
import Error from './pages/Error';
import DeferredBlogPosts, { loader as slowPostsLoader } from './pages/DeferredBlogPosts';

// switch-to-v6.4-STEP 5:
// we have to use a new kind of router - data router,- which is
// compatible with the new Data API. To create it we need to use a combination of:
// - 'createBrowserRouter' function which accepts Routes
// - 'createRoutesFromElements' function which creates Routes from Elements
const router = createBrowserRouter(
  createRoutesFromElements(
    //   switch-to-v6.4-STEP 6:
    // - remove all Routes definitions from 'App' function
    // - pass them to 'createRoutesFromElements'
    // -change <Routes/> component to <Route/> component
    // - set its 'path' to root path
    // - set its 'element' to element we want to render on route match
    // =================
    // if we want to customize what user sees when an error occurs,
    // we need to pass a JSX element to an 'errorElement' attribute of <Route/>
    // and in this case React Router will render this element INSTEAD of
    // an element which is provided with 'element' attribute.
    // The good thing is that we can simply provide such an element
    // on the ROOT (the TOPMOST) Route and if we have an error
    // EVEN in some deeply NESTED route, it will BUBBLE UP to the ROOT Route
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      {/* switch-to-v6.4-STEP 7:
       - add an 'INDEX' attribute to one of the NESTED Routes to render
       a component (page) by default */}
      <Route index element={<WelcomePage />} />
      <Route path="/blog" element={<BlogLayout />}>
        {/* switch-to-v6.4-STEP 3:
             - we add our previously declared and exported 'loader' function to
             the new 'loader' attribute of <Route/> component */}
        {/* When React Router evaluates this Route it will (1)call the provided loader
             function and (2)make the data returned from this function available to the
             rendered component (see the next step in BlogPostsPage.jsx ) */}
        {/* <Route index element={<BlogPostsPage />} loader={blogPostsLoader} /> */}
        {/* here we are simulating a slow network request with a loader which
         has sleep(2000) under the hood to postpone the actual request sending.
         As we know React Router WILL NOT REDIRECT until loader finished */}
        <Route index element={<DeferredBlogPosts />} loader={slowPostsLoader} />
        <Route path=":id" element={<PostDetailPage />} loader={postLoader} />
      </Route>
      {/* when we submit a form inside <NewPostForm/> component,
       this Route will match with what was defined as (1)'action' prop of the form
       and call the function which we pass to (2)'action' prop of the <Route/> component.
        So we basically have 2 similarly named props BUT they expect completely
        DIFFERENT values:
         - 'action' of <Form/> expects a STRING (relative path)
         - 'action' of <Route/> expects a FUNCTION which will do
          the main work on form submission */}
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
    </Route>,
  ),
);

function App() {
  // switch-to-v6.4-STEP 8:
  // - instead of having Routes tree here and using <BrowserRouter/>,
  // we now just use a special component for working with new React Router Data API:
  // <RouterProvider />
  return <RouterProvider router={router} />;
}

export default App;
