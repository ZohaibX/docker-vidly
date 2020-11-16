import React from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "./../GraphQL/Mutations/signIn";
import { Connect } from "../Redux/4-connect";
import { Link } from "react-router-dom";

export interface SignInProps {
  userToken: string;
  setUserToken: any;
  location: any;
}

//! For Logout
/* localStorage.removeItem("token");
  window.location = "/"; // to reload the page 
*/

//! For SignUp
// we will do almost same things as here

const SignIn: React.SFC<SignInProps> = (props: SignInProps) => {
  const [signIn, { signInData, error, loading }]: any = useMutation(SIGN_IN);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitForm = async (e: any) => {
    e.preventDefault();

    try {
      const { data }: any = await signIn(
        { variables: { email: "test1", password: "test1" } },
        { errorPolicy: "all" }
      );
      props.setUserToken(data.signIn.token);
      const jwt = data.signIn.token;

      localStorage.setItem("token", jwt); // storing the token in user's browser

      // state is some property in props when we are being redirected or when we come from the route
      const { state } = props.location; // state will have some location if we are being redirected -- and if we simply went to the loginUser route -- state will be null
      console.log(state);

      window.location = state ? state.from.pathname : "/"; // if state is not null -- it will have this property
      // we may do props.history.push("/") or props.history.replace("/")
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">Sign In</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form className=" mt-5 ml-5" onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            {/* {error && <p className="alert alert-danger">{error.message}</p>} */}
            <Link to="/sign-up">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </Link>
            <span> </span>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connect(SignIn);
