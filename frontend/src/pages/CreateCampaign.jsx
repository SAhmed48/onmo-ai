// CreateCampaign.jsx
// Page for creating a new campaign, including AI-powered suggestions.
import { useState } from "react";
import { createCampaign, getAISuggestions } from "../api";
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
  Row,
  Col,
  Alert,
} from "reactstrap";

export default function CreateCampaign() {
  // State for campaign form fields
  const [form, setForm] = useState({
    title: "",
    objective: "Traffic",
    budget: "",
    target: 0,
    audience: "",
  });
  // State for AI suggestions, success, and error messages
  const [suggestions, setSuggestions] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Request AI-powered campaign suggestions
  const handleSuggest = async () => {
    try {
      if (!form.title || !form.objective || !form.budget) {
        alert("Please fill in all required fields before getting suggestions.");
        return;
      }
      const campaignData = {
        name: form.title,
        objective: form.objective,
        budget: form.budget,
      };
      const { data } = await getAISuggestions(campaignData);
      setSuggestions(data); // Store the array of suggestions in the state
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err);
      console.error("AI Suggestion error:", err);
    }
  };

  // Handle campaign form submission
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(form);
      setSuccessMessage("Campaign created successfully!");
      // Redirect to campaign list after a short delay
      setTimeout(() => {
        navigate("/campaigns");
      }, 2000);
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err);
      console.error("Campaign save error:", err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px" }}>
        {successMessage && (
          <Alert key="success" variant="success">
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert key="error" variant="error">
            {errorMessage}
          </Alert>
        )}

        <CardBody>
          <Button
            style={{ marginTop: "10px" }}
            color="info"
            type="button"
            onClick={() => navigate("/campaigns")}
            block
          >
            Back to Campaigns
          </Button>
          <CardTitle tag="h3" className="text-center mb-4">
            Create Campaign
          </CardTitle>

          <Form onSubmit={handleSave}>
            {/* Campaign Name */}
            <FormGroup>
              <Label for="name">Campaign Name</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter campaign name"
                value={form.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {/* Objective */}
            <FormGroup>
              <Label for="objective">Objective</Label>
              <Input
                type="select"
                id="objective"
                name="objective"
                value={form.objective}
                onChange={handleChange}
              >
                <option value="Traffic">Traffic</option>
                <option value="Conversions">Conversions</option>
              </Input>
            </FormGroup>

            {/* Budget */}
            <FormGroup>
              <Label for="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                placeholder="Enter budget"
                value={form.budget}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {/* Target Audience */}
            <FormGroup>
              <Label for="target">Target</Label>
              <Input
                id="target"
                name="target"
                placeholder="Enter target"
                value={form.target}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="budget">Audience</Label>
              <Input
                id="audience"
                name="audience"
                placeholder="Enter audience"
                value={form.audience}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Row className="justify-content-center">
              <Col>
                <Button color="primary" type="submit" block>
                  Save Campaign
                </Button>
              </Col>
            </Row>
          </Form>

          <Row>
            <Col>
              <Button
                style={{ marginTop: "10px" }}
                color="info"
                type="button"
                onClick={handleSuggest}
                block
              >
                AI Suggest
              </Button>
              <div>
                {suggestions && (
                  <>
                    <h5 style={{ marginBottom: "10px" }}>Suggestion:</h5>
                    <p>{suggestions}</p>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
