import React, { useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const emailEl = useRef();
  const fetcher = useFetcher();

  function signupForNewsletterHandler(event) {
    event.preventDefault();
    const enteredEmail = emailEl.current.value;
    // another advanced feature of React Router v6.4 is FETCHER.
    // It helps us with calling ACTIONS/LOADERS WITHOUT NAVIGATION.
    // Which means that we don't trigger any URL change which is perfect
    // if we want to get/post some data, and we want to stay on the same page
    // after action/loader finishes its work.
    // So basically it is very useful for ANY interactions with the server
    // that aren't navigation events.
    fetcher.submit(
      { email: enteredEmail },
      { method: 'post', action: '/newsletter' },
    );
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our weekly newsletter</h2>
      <fetcher.Form onSubmit={signupForNewsletterHandler}>
        <input
          ref={emailEl}
          id="email"
          type="email"
          placeholder="Your email"
          aria-label="Your email address."
        />
        <button type="submit">Sign Up</button>
      </fetcher.Form>
    </section>
  );
}

export default NewsletterSignup;
