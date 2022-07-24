import { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../components/context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

export const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;
  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  else if (isAuthenticated) return <Navigate to="/dashboard" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {authRoute === "login" ? <h1>Sign In</h1> : <h1>Register</h1>}
          {body}
        </div>
      </div>
    </div>
  );
};
