const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaigns.controller.js");
const auth = require("../middleware/auth.js");

router.get("/", auth, campaignController.listCampaigns);
router.post("/", auth, campaignController.createCampaign);
router.post("/suggest", auth, campaignController.getSuggestion);

module.exports = router;
