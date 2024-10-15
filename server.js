const express = require('express');
const cors = require('cors');
const { products } = require('./products');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('.'));

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Search for products
app.get('/api/search', (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products];

  if (name) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
