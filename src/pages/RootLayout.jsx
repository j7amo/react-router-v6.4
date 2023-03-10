import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

// switch-to-v6.4-STEP 9 (FINAL):
// Because <RootLayout/> is now a PARENT route for NESTED routes,
// we have to use <Outlet/> component to set a placeholder/marker
// to use a place for rendering NESTED routes components
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
