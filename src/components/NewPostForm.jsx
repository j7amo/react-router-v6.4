/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-router-dom';
import classes from './NewPostForm.module.css';

// time to refactor NewPostForm to use React Router Data API
// we now don't have to pass 'onSubmit' prop because React Router
// will do it differently
function NewPostForm({ onCancel, submitting }) {
  return (
    // React Router v6.4 gives us a new <Form/> component.
    // Here we set:
    // - 'method' prop (this is needed to define what HTTP verb we wanna use)
    // - 'action' prop (this is needed to define a URL to submit a FormData to,
    // BUT this is a special version of 'action' which supports RELATIVE paths)
    // So when this form is submitted it will:
    // - submit the FormData to 'action' URL;
    // - INVOKE function which is provided by us to 'action' prop of matched Route
    <Form className={classes.form} method="post" action="/blog/new">
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
    </Form>
  );
}

NewPostForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  // we don't need to validate anymore
  // onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default NewPostForm;
