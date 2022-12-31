import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './BlogPost.module.css';

function BlogPost({ title, text }) {
  return (
    <article className={classes.post}>
      <h1>{title}</h1>
      <p>{text}</p>
    </article>
  );
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default BlogPost;
