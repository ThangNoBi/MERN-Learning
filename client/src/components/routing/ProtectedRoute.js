import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";
import { NavbarMenu } from "../layout/NavbarMenu";

export const ProtectedRoute = ({ Component }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    // {...rest}
    // element={
    isAuthenticated ? (
      <>
        <NavbarMenu />
        <Component />
      </>
    ) : (
      <Navigate to="/login" />
    )
    // }
  );
};
