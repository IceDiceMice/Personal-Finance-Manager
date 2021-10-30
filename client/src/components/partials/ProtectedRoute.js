import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, access, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        access ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/generator",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
