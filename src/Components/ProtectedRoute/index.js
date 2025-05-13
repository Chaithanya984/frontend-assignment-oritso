import { Redirect, Route } from "react-router-dom";

import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const geting = Cookies.get("jwt_token");
  if (geting === undefined) {
    return <Redirect to="/" />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
