import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { name } = props;

  const [show, setShow] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  const arrUser = [];
  const arrAdmin = ["dashboard"];

  useEffect(() => {
    if (role === 0 && arrAdmin.includes(name)) {
      setShow(true);
    } else if (role === 1 && arrUser.includes(name)) {
      setShow(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>{show ? props.children : <Navigate to="/no-access" />}</div>;
};

export default ProtectedRoute;
