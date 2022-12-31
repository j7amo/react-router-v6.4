/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './NewPostForm.module.css';

function NewPostForm({ onCancel, onSubmit, submitting }) {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea id="text" name="post-text" required minLength={10} rows={5} />
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting} type="submit">
        {submitting ? 'Submitting...' : 'Create Post'}
      </button>
    </form>
  );
}

NewPostForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default NewPostForm;
