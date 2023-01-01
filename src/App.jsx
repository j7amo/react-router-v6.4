import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader } from './pages/BlogPosts';

import NewPostPage from './pages/NewPost';
import PostDetailPage from './pages/PostDetail';
import RootLayout from './components/RootLayout';
import WelcomePage from './pages/Welcome';

// 5) this is the next step for switching from 'old' approach:
// we have to use a new kind of router - data router,- which is
// compatible with the new Data API. The whole setup of the <App/>
// component will change COMPLETELY! (please see the next commit)
function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/blog" element={<BlogLayout />}>
            {/* 3) this is the next step of switching from 'old' approach for data fetching:
             - we add our previously declared and exported 'loader' function to
             the new 'loader' attribute of <Route/> component */}
            {/* When React Router evaluates this Route it will (1)call the provided loader
             function and (2)make the data returned from this function available to the
             rendered component (see the next step in BlogPostsPage.jsx ) */}
            <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
            <Route path=":id" element={<PostDetailPage />} />
          </Route>
          <Route path="/blog/new" element={<NewPostPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
