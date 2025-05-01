import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Go High Level Products API');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 