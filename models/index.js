const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; 

app.use(express.json());

app.get('/trails', async (req, res) => {
  try {
    const response = await axios.get(
      'https://data.townofcary.org/api/explore/v2.1/catalog/datasets/greenway-trails/records?limit=20&refine=status%3A%22Existing%22'
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trail data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
