import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atoms } from "../states";

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const isAuth = useRecoilValue(atoms.isAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
