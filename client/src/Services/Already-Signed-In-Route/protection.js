import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { gettingUserData } from "./../../GraphQL/JWT-Decode/decode";

const AlreadySignedInProtectedRoute = (props) => {
  const { path, component: Component, render, ...rest } = props;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (gettingUserData())
          return (
            <Redirect
              to={{
                pathname: "/",
                // state: { from: props.location }, // login User props have different properties , state is normally undefined . now we are setting the state to the location from where we are being redirected -- like movie form
                // // its further work is in login page where we have set window.location
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props); // rendering component dynamically ... for the case if component is nul
      }}
    />
  );
};

export default AlreadySignedInProtectedRoute;
