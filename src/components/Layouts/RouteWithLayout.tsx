import React from 'react';
import { Route } from 'react-router-dom';

export default function RouteWithLayout({ layout, component, layoutProps, guard, ...rest }: any) {
  const Guard = guard || React.Fragment;
  const Layout = layout || React.Fragment;
  const Component = component;

  // ToDo: check layout props (maybe last implementation works better?)
  return (
    <Route
      {...rest}
      render={(props) => (
        <Guard>
          <Layout>
            <Component {...props} />
          </Layout>
        </Guard>
      )}
    />
  );
}
