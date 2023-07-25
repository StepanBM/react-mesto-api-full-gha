import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" />;
};

export default ProtectedRouteElement;
