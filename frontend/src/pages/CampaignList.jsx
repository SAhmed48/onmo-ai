// CampaignList.jsx
// Page to display all campaigns for the logged-in user.
import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";

// Card component for displaying a single campaign
const CampaignCard = ({ campaign }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{campaign.title}</h5>
        <p className="card-text">
          <strong>Objective:</strong> {campaign.objective}
        </p>
        <p className="card-text">
          <strong>Target:</strong> {campaign.target}
        </p>
        <p className="card-text">
          <strong>Budget:</strong> {campaign.budget}
        </p>
        <p className="card-text">
          <strong>Audience:</strong> {campaign.audience}
        </p>
        <p className="card-text">
          <strong>Conversion:</strong> {campaign.conversion}
        </p>
      </div>
    </div>
  );
};

export default function CampaignList() {
  // State for campaigns and loading status
  const [campaigns, setCampaigns] = useState([]);
  const [loadCampaigns, setLoadCampaigns] = useState(true);
  const navigate = useNavigate();

  // Fetch campaigns on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetchCampaigns();
        setLoadCampaigns(false);
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };
    getData();
  }, []);

  // Show loading state while fetching
  if (loadCampaigns)
    return (
      <Container className="d-flex flex-column align-items-center mt-5">
        Loading Campaigns
      </Container>
    );

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card style={{ width: "600px" }}>
        <CardBody>
          <Row className="mb-3">
            <Col>
              <CardTitle tag="h3">My Campaigns</CardTitle>
            </Col>
            <Col className="text-end">
              <Button
                color="primary"
                onClick={() => navigate("/campaigns/new")}
              >
                + New Campaign
              </Button>
              <Button
                style={{ marginLeft: 2 }}
                variant="light"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                logout
              </Button>
            </Col>
          </Row>

          {campaigns.length === 0 ? (
            <p className="text-center text-muted">No campaigns found.</p>
          ) : (
            <ListGroup>
              {campaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </ListGroup>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
