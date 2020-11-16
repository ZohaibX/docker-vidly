import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { gettingUserData } from "./../../GraphQL/JWT-Decode/decode";

const AddRecipeProtectedRoute = (props) => {
  // component should be Component
  // Important note :- Make Sure that we are getting user from gettingUser function or any other function by me
  // here im using gettingUser but in my 2nd practice -- im using contexts and hooks .. so some way is changed

  const { component: Component, render } = props;

  return (
    <Route
      path={props.path}
      {...props.rest}
      render={(props) => {
        console.log(props);
        if (!gettingUserData())
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: props.location }, // login User props have different properties , state is normally undefined . now we are setting the state to the location from where we are being redirected -- like movie form
                // its further work is in login page where we have set window.location
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props); // rendering component dynamically ... for the case if component is nul
      }}
    />
  );
};

export default AddRecipeProtectedRoute;
