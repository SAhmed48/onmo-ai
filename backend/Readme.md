# Omno AI Backend

Omno AI is a serverless Node.js backend for campaign management and AI-powered suggestions, using AWS Lambda, API Gateway, DynamoDB, and OpenAI.

---

## Main API Endpoints

- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — Login and receive JWT
- `GET /api/campaigns` — List campaigns (auth required)
- `POST /api/campaigns` — Create a campaign (auth required)
- `POST /api/campaign/suggest` — Get AI campaign suggestions (auth required)

---

## Local Setup Instructions

### Requirements
- Node.js 18+ (Node 20 recommended)
- AWS credentials (for DynamoDB access)
- OpenAI API key

### Environment Variables
Create a `.env` file in the root with:
```
OPENAI_API_KEY=your-openai-key
JWT_SECRET=your-jwt-secret
AWS_REGION=us-west-1
```

### Install dependencies
```sh
npm install
```

### Run locally (with serverless-offline)
```sh
npx serverless offline
```
The API will be available at: `http://localhost:3000/dev`

### Example Requests
- Register:
  ```sh
  curl -X POST http://localhost:3000/dev/api/user/register \
    -H "Content-Type: application/json" \
    -d '{"email": "test@email.com", "password": "password123"}'
  ```
- Login:
  ```sh
  curl -X POST http://localhost:3000/dev/api/user/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@email.com","password":"password123"}'
  ```
- Create Campaign (requires Bearer token):
  ```sh
  curl -X POST http://localhost:3000/dev/api/campaign \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -d '{"title": "...", "objective": "...", "budget": 1000, "target": "...", "audience": "..."}'
  ```
- Get Suggestions (requires Bearer token):
  ```sh
  curl -X POST http://localhost:3000/dev/api/campaign/suggest \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -d '{"objective": "...", "name": "...", "budget": 1000}'
  ```

---

## AWS Lambda + API Gateway Deployment

### Build Lambda Package
```sh
zip -r lambda-package.zip .
```

### Upload to S3 (optional)
```sh
aws s3 cp lambda-package.zip s3://<your-s3-bucket>/path/to/lambda-package.zip
```

### Deploy with Serverless Framework
```sh
npx serverless deploy
```
- This will deploy the function and set up API Gateway endpoints.

### Manual Lambda Update
- Direct upload:
  ```sh
  aws lambda update-function-code --function-name <lambda-function-name> --zip-file fileb://lambda-package.zip
  ```
- From S3:
  ```sh
  aws lambda update-function-code --function-name <lambda-function-name> --s3-bucket <your-s3-bucket> --s3-key path/to/lambda-package.zip
  ```

### Environment Variables on AWS
- Set `OPENAI_API_KEY`, `JWT_SECRET`, and any AWS credentials/secrets in the Lambda environment variables.

---