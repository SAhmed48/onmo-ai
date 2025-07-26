import axios from "axios";

// Use only the API URL from .env (VITE_API_URL)
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error(
    "VITE_API_URL is not set. Please define it in your .env file at the project root.",
  );
}

const API = axios.create({
  baseURL,
});

// Auth
export const loginUser = (data) =>
  API.post("/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const signupUser = (data) =>
  API.post("/user/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Campaigns
export const fetchCampaigns = () =>
  API.get("/campaign", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const createCampaign = (data) =>
  API.post(
    "/campaign",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    data,
  );

// AI Suggest
export const getAISuggestions = (data) =>
  API.post("/campaign/suggest", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export default API;
