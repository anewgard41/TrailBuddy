const axios = require('axios');

const API_ENDPOINT = 'https://data.townofcary.org/api/explore/v2.1/catalog/datasets/greenway-trails/records';

const searchTrails = async (searchTerm, pageNumber = 1) => {
  try {
    // Check if the searchTerm is provided and valid
    if (!searchTerm) {
      throw new Error('No search term provided');
    }

    const limit = 20;
    const offset = (pageNumber - 1) * limit;
    const response = await axios.get(API_ENDPOINT, {
      params: {
        // The 'where' parameter should contain the search function as per the API documentation
        where: `search(*,"${searchTerm}")`,
        limit: limit, // The API uses 'limit' to specify the number of records to return
        offset: offset, // The API uses 'offset' to specify the number of records to skip
        timezone: 'America/New_York', // Including timezone if required by the API
        lang: 'en', // Including language code if required by the API
      }
    });

    // Log the API response for debugging
    console.log("API Response: in back end", response.data);

    // If the API response structure is different, adjust the return statement accordingly
    return response.data.results || [];
  } catch (error) {
    console.error(`Failed to fetch trails: ${error.message}`);
    throw error; // Rethrowing the error is important if you want the caller to handle it
  }
};

module.exports = { searchTrails };
