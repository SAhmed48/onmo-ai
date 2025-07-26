# Project Deliverables

## 1. AWS Deployed URLs

- ✅ **Frontend URL (CloudFront):**
  - [https://d13u3z926ba469.cloudfront.net/](https://d13u3z926ba469.cloudfront.net/)
- ✅ **Backend API URL (API Gateway):**
  - [https://l5ahr2mlk3.execute-api.us-west-1.amazonaws.com/dev/api](https://l5ahr2mlk3.execute-api.us-west-1.amazonaws.com/dev/api)

## 2. GitHub Repository Structure

- `/frontend` &rarr; Web app code
- `/backend` &rarr; Lambda code
- `readme.md` includes:
  - How to run locally
  - AWS deployment steps
  - Any stretch goals completed

## 3. AI Integration Notes

- **LLM Used:** OpenAI (GPT-4)
- **Example Prompt & Response:**

  **Prompt:**
  ```
  Suggest the best target audience and budget for a digital ad campaign with objective: ${campaign.objective}, name: ${campaign.name}, and initial budget: ${campaign.budget}.
  ```

  **Response:**
  > To determine the best target audience and budget allocation for your digital ad campaign for "Tech World" with the objective of driving traffic, here's a recommended strategy:
  >
  > **Target Audience:**
  > - **Demographics:**
  >   - Age: 18-45 years old (tech enthusiasts, early adopters)
  >   - Gender: All genders
  >   - Location: Focus on regions with high internet penetration and interest in technology (e.g., urban areas, tech hubs)
  >   - Interests: Technology, gadgets, ...