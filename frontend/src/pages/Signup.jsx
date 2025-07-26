// Signup.jsx
// Page for user registration and account creation.
import { useState } from "react";
import { signupUser } from "../api"; // <-- make sure to import signupUser
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

export default function Signup() {
  // State for email, password, confirm password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      localStorage.removeItem("token"); // Remove any existing token
      await signupUser({ email, password });
      navigate("/campaigns"); // Redirect to campaigns page
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Create Account
          </CardTitle>

          {error && <Alert color="danger">{error}</Alert>}

          <Form onSubmit={handleSignup}>
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button color="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
          <p
            className="text-center mt-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </p>
        </CardBody>
      </Card>
    </Container>
  );
}
