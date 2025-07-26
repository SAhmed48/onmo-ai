const { v4: uuidv4 } = require("uuid");
const db = require("../services/db");
const { getOpenAISuggestion } = require("../utils/openai.js");

// List all campaigns for the authenticated user
exports.listCampaigns = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    // Query DynamoDB for campaigns belonging to the user
    const params = {
      TableName: "Campaigns",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const campaigns = await db.query(params);
    res.json(campaigns.Items);
  } catch (err) {
    // Handle errors fetching campaigns
    console.error("Error fetching campaigns:", err);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

// Create a new campaign for the authenticated user
exports.createCampaign = async (req, res) => {
  if (req.body instanceof Buffer) {
    req.body = JSON.parse(req.body.toString());
  }

  const { title, objective, budget, target, audience } = req.body;

  // Validate input
  if (!title || !objective || !budget || !target || !audience) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if a campaign with the same title already exists for the user
  const params = {
    TableName: "Campaigns",
    IndexName: "userId-title-index", // Use the name of the GSI you created
    KeyConditionExpression: "userId = :userId and title = :title", // Query by userId and title
    ExpressionAttributeValues: {
      ":userId": userId,
      ":title": title,
    },
  };

  try {
    // Query for existing campaign with the same title
    const existingCampaign = await db.query(params); // Assuming query method exists on db
    if (existingCampaign.Items && existingCampaign.Items.length > 0) {
      return res
        .status(400)
        .json({ error: "Campaign with the same title already exists" });
    }
  } catch (err) {
    // Handle errors during campaign creation
    console.error("Error creating campaign:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }

  // Prepare new campaign object
  const campaign = {
    userId,
    id: uuidv4(),
    title,
    objective,
    budget,
    target,
    audience,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    // Store new campaign in the database
    await db.put("Campaigns", campaign);
    res.json({ message: "Campaign created", campaign });
  } catch (err) {
    // Handle errors during campaign storage
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get AI-powered campaign suggestions
exports.getSuggestion = async (req, res) => {
  try {
    if (req.body instanceof Buffer) {
      req.body = JSON.parse(req.body.toString());
    }
    const { objective, name, budget } = req.body;
    // Validate input
    if (!objective || !name || !budget) {
      return res
        .status(400)
        .json({ error: "Objective, name, and budget are required" });
    }
    // Call OpenAI utility to get suggestion
    const suggestion = await getOpenAISuggestion(req.body);
    return res.status(200).json(suggestion);
  } catch (error) {
    // Handle errors during suggestion generation
    console.error("Error parsing JSON:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
