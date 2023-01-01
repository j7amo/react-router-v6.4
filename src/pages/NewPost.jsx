import React, { useCallback } from 'react';
import {
  redirect, useActionData, useNavigate, useNavigation,
} from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

// time to refactor NewPostPage to use React Router Data API
function NewPostPage() {
  // we no longer need to have state slices for:
  // - loading
  // - errors
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState();

  // 'useActionData' hook allows us to get hold of data
  // returned by function which was registered as 'action'
  // prop value for the <Route/> component
  const data = useActionData();
  const navigate = useNavigate();

  // but what if we want to use loading state?
  // there's another hook - useNavigation().
  // it returns a 'navigation' object which has 'state' property
  // which can have one of the following values:
  // - 'idle' (no actions/loaders currently working)
  // - 'submitting' (action is currently working)
  // - 'loading' (loader is currently working)
  const navigation = useNavigation();
  // So basically we can have 2 main scenarios:
  // If we are using 'GET' method then navigation state status changes like this:
  // idle → loading → idle
  // If we are using 'POST', 'PUT', 'PATCH', 'DELETE':
  // idle → submitting → loading → idle

  // we no longer need submitHandler
  // const submitHandler = useCallback(async (event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData(event.target);
  //     const post = {
  //       title: formData.get('title'),
  //       body: formData.get('post-text'),
  //     };
  //     await savePost(post);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsSubmitting(false);
  // }, []);

  const cancelHandler = useCallback(() => {
    navigate('/blog');
  }, []);

  return (
    <>
      {data && data.status && <p>{data.message}</p>}
      {/* we now can use navigation object to understand if are currently submitting */}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
    </>
  );
}

// functions that we pass to 'action' and 'loader' <Route/>'s props
// automatically receive an object which has 'request' and 'params' keys
// this time with form submission we need FormData:
// p.s. this function needs to be async because of await
export async function action({ request }) {
  // to get it we need to call 'formData' method which returns a Promise,
  // so we need to await it:
  const formData = await request.formData();
  const post = {
    // and we get input values by using 'get' method (we need to pass a name of the input)
    title: formData.get('title'),
    body: formData.get('post-text'),
  };

  // savePost function returns a Promise,
  // so we need to await it and handle possible errors
  try {
    await savePost(post);
  } catch (err) {
    // here we specifically check the error status for '422' value
    // for validation sake
    if (err.status === 422) {
      // if we throw an error here then it will bubble up, and
      // we will be on the error page and this is not what we want here!
      // we want to show the user if his input is INVALID
      // and give a chance to make corrections and re-submit the form.
      // so instead of THROWING we now RETURN an error object
      // which we can get with the help of 'useActionData' hook:
      // throw err;
      return err;
    }

    // if the 'action' prop function throws an error
    // then this error will BUBBLE UP to the nearest Route
    // which has a value in 'errorElement' prop (it will be
    // a ROOT Route in our case which is fine)
    throw err;
  }

  // after we successfully sent the data we should use
  // 'redirect' function which is provided by React Router v6.4
  return redirect('/blog');
}

export default NewPostPage;
