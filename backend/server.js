const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// fetch movs endpoint
app.get('/api/popular-movies', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key: '12ac22d9022ae7a3f3fa5e61b3c39cf7',
        },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
