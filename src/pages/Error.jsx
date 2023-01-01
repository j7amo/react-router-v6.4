import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function Error() {
  // to get the DETAILS of an error we can get error object with a new hook:
  const error = useRouteError();

  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
      </main>
    </>
  );
}

export default Error;
