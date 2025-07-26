// Login.jsx
// Page for user login and authentication.
import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";

export default function Login() {
  // State for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser({ email, password });
      // Store the token in localStorage for authentication
      localStorage.setItem("token", `${loginData.data.token}`);
      navigate("/campaigns"); // Redirect to campaigns page
    } catch (err) {
      setError(`${err.response.data.error}`);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Login
          </CardTitle>

          {error && <Alert color="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button color="primary" type="submit" block>
              Login
            </Button>
          </Form>

          <p
            className="text-center mt-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </p>
        </CardBody>
      </Card>
    </Container>
  );
}
