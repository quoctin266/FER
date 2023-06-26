import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = (props) => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // prevent access to features if not log in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;
};

export default Private;
