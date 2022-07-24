import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AlertMessage } from "../layout/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);
  // const [validated, setValidated] = useState(false);

  const { username, password, confirmPassword } = registerForm;

  const handleChangeRegisterForm = (e) => {
    let { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }

    // setValidated(true);

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={register}
        noValidate
        // validated={validated}
      >
        <AlertMessage info={alert} />
        <Form.Group controlId="validationCustomUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChangeRegisterForm}
            required
            className="mt-2"
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeRegisterForm}
            required
            className="my-3"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeRegisterForm}
            required
            className="mb-3"
          />
        </Form.Group>
        <Button variant="success" type="submit" size="lg" className="my-2">
          Register
        </Button>
      </Form>
      <p>
        Already an account?
        <Link to="/login">
          <Button variant="info" size="md" style={{ marginLeft: "10px" }}>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
