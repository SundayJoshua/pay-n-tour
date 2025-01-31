const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let checkoutData = {}; 

app.post('/api/cart/checkout', (req, res) => {
  const { totalPrice, sessionId } = req.body;
  
  if (!totalPrice) {
    return res.status(400).json({ error: "Total amount is required" });
  }

  // Store data in memory
  checkoutData[sessionId] = { totalPrice, sessionId };

  console.log(`Received total: ${totalPrice} from session: ${sessionId}`);
  
  // Here you could process the payment, save the transaction, etc.
  res.json({ message: "Total received successfully", totalPrice });
});

// Endpoint to fetch stored checkout data
app.get('/api/cart/checkout', (req, res) => {
  res.json(checkoutData);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
