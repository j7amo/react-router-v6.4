import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import classes from './Posts.module.css';

function Posts({ blogPosts }) {
  return (
    <ul className={classes.posts}>
      {blogPosts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}>
            <h2>{post.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

Posts.propTypes = {
  blogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Posts;
