import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products from Go High Level API
 * @access  Public (requires API key)
 */
router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.GHL_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'API key is not configured' 
      });
    }

    const response = await fetch('https://rest.gohighlevel.com/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        success: false, 
        error: `Failed to fetch products from GHL API: ${response.statusText}` 
      });
    }

    const data = await response.json();
    
    // Return only the products array
    if (data && data.products) {
      return res.json(data.products);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error while fetching products'
    });
  }
});

export default router; 