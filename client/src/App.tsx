import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavbarPage from "./components/Navbar/navbar";
import Movies from "./pages/movies";
import NotFoundPage from "./pages/notFound";
import SignIn from "./pages/signIn";
import NewMoviePage from "./pages/newMovie";
import SignUp from "./pages/signUp";
import Movie from "./pages/movie";
import { gettingUserData } from "./GraphQL/JWT-Decode/decode";
import Tasks from "./pages/tasks";
import ProtectedRoute from "./Services/Protected-Route/protection.js";
import AlreadySignedInProtectedRoute from "./Services/Already-Signed-In-Route/protection";

// Axios For REST
import axios from "./Services/HTTP-Services/axios.js"; // this file compiles successfully

function App() {
  React.useEffect(() => {
    const userData = gettingUserData();
    console.log(userData);
  }, []);

  return (
    <div className="">
      <NavbarPage />
      <Switch>
        <Route path="/page-not-found" component={NotFoundPage}></Route>
        <AlreadySignedInProtectedRoute
          path="/sign-in"
          component={SignIn}
        ></AlreadySignedInProtectedRoute>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/add-new-movie" component={NewMoviePage}></Route>
        <Route path="/movie/:id" component={Movie}></Route>
        <ProtectedRoute path="/tasks" component={Tasks}></ProtectedRoute>
        <Route exact path="/" component={Movies}></Route>
        <Redirect to="/page-not-found" />
      </Switch>
    </div>
  );
}

export default App;
