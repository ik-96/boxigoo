

const express = require('express'); 
const cors = require('cors'); 
const axios = require('axios');
const app = express(); 
const PORT = 3001;


app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('http://test.boxigo.in/api_assignment.json', {

    });
    console.log(response.data,"response.data");
    res.json(response.data);
  
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  
});


