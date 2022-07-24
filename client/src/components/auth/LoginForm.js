import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AlertMessage } from "../layout/AlertMessage";

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  // Router
  // const history = useNavigate();

  // Local state
  const [loginForm, setloginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const handleChangeLoginForm = (e) => {
    let { name, value } = e.target;
    setloginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        // console.log("Logg :", loginData.message);
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            // required
            onChange={handleChangeLoginForm}
            className="mt-2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeLoginForm}
            // required
            className="my-3"
          />
        </Form.Group>
        <Button variant="info" type="submit" size="lg" className="mb-2">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="success" size="md" style={{ marginLeft: "10px" }}>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
