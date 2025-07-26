# Omno AI Frontend

This is the frontend for the Omno AI platform, built with React and Vite. It provides a user interface for campaign management, user authentication, and AI-powered campaign suggestions.

## Project Structure & Pages

- **Login (`/` or `/login`)**: User login page. Authenticates users and stores a JWT token in local storage.
- **Signup (`/signup`)**: User registration page. Allows new users to create an account.
- **Campaign List (`/campaigns`)**: Displays all campaigns for the logged-in user. Users can log out or create a new campaign from here.
- **Create Campaign (`/campaigns/new`)**: Form to create a new campaign. Includes AI-powered suggestions for campaign details.

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Create a `.env` file in the `frontend` directory:**
   ```env
   VITE_API_URL=http://localhost:3000/dev/api
   ```
   > **Note:** The app will not work unless `VITE_API_URL` is set in your `.env` file.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## API URL Configuration (.env)

The API base URL **must** be set in your `.env` file using the `VITE_API_URL` variable. For example:
```env
VITE_API_URL=http://localhost:3000/dev/api
```
- For production deployments, set this to your deployed API endpoint, e.g.:
```env
VITE_API_URL=https://l5ahr2mlk3.execute-api.us-west-1.amazonaws.com/dev/api
```
If `VITE_API_URL` is not set, the app will throw an error and not start.

## Deploying to AWS S3 + CloudFront

### 1. Build the project
```bash
npm run build
```
This will generate a `dist/` folder with static files.

### 2. Upload to S3
- Create an S3 bucket (e.g., `omno-ai-frontend`).
- Enable static website hosting on the bucket.
- Upload the contents of the `dist/` folder to the bucket.

### 3. Set up CloudFront
- Create a CloudFront distribution.
- Set the S3 bucket as the origin.
- Configure the default root object to `index.html`.
- (Optional) Set up a custom domain and SSL.

### 4. Get the URL
- After deployment, CloudFront will provide a public URL (e.g., `https://dxxxxxx.cloudfront.net`).
- You can use this URL to access your deployed frontend.

---

For any API changes, update the `VITE_API_URL` in your `.env` and rebuild/redeploy the frontend.
