# Go High Level Products API

A simple Express server that fetches products from the Go High Level API.

## Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
node setup-env.js
```

4. Open the `.env` file and add your Go High Level API key:
```
GHL_API_KEY=your_actual_api_key_here
PORT=5000
```

## Usage

### Start the server:

```bash
npm start
```

For development with automatic restart:
```bash
npm run dev
```

### API Endpoints

- **GET /api/products**: Fetch all products from Go High Level
- **GET /health**: Health check endpoint to verify the server is running
- **GET /**: Root endpoint

## Example Request

Fetch products:
```bash
curl http://localhost:5000/api/products
```

## Notes

- The server runs on port 5000 by default
- You need a valid Go High Level API key to fetch products
- The API returns only the products array from the GHL response 