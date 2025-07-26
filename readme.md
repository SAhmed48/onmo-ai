# Omno AI Project

## Project Overview
Omno AI is a full-stack application for campaign management, featuring user authentication, campaign creation, and AI-powered campaign suggestions. The project consists of a React + Vite frontend and a Node.js (Express) backend, designed for easy deployment to AWS (S3, CloudFront, Lambda).

---

## How to Run Locally

### 1. Clone the Repository
```bash
git clone <repo-url>
cd onmo-ai
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Create a .env file with required environment variables (see backend/Readme.md)
npm run dev
```
- The backend will run on `http://localhost:3000` by default.

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
# Create a .env file with:
# VITE_API_URL=http://localhost:3000/dev/api
npm run dev
```
- The frontend will run on `http://localhost:5173` by default.

---

## AWS Deployment Steps

### Backend (Serverless)
1. Configure AWS credentials (IAM user with Lambda, API Gateway, S3 permissions).
2. In `backend/`, update `serverless.yml` as needed.
3. Deploy with:
   ```bash
   npx serverless deploy
   ```
4. Note the deployed API endpoint from the output.

### Frontend (S3 + CloudFront)
1. In `frontend/`, set the API URL in `.env` to your deployed backend endpoint:
   ```env
   VITE_API_URL=https://<your-api-id>.execute-api.<region>.amazonaws.com/dev/api
   ```
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Upload the contents of `frontend/dist/` to your S3 bucket (static website hosting enabled).
4. Set up a CloudFront distribution with the S3 bucket as the origin.
5. Access your app via the CloudFront URL.

---

## Project Notes & MVP Improvements

### What Was Built
- User authentication (login/signup) with JWT
- Campaign management: create, list, and view campaigns
- AI-powered campaign suggestions
- Protected routes for authenticated users
- Serverless backend (Node.js/Express on AWS Lambda)
- Production-ready static frontend (React + Vite on S3 + CloudFront)

### What I'd Improve for a Full MVP
- Add user profile management (edit profile, change password)
- Campaign editing and deletion
- Integration tests and CI/CD pipeline
- Role-based access control (admin/user)
- Analytics dashboard for campaign performance
- Email notifications (signup, campaign updates)

---

For more details, see the `frontend/README.md` and `backend/Readme.md` files.
