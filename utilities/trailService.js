const axios = require('axios');

const API_ENDPOINT = 'https://data.townofcary.org/api/explore/v2.1/catalog/datasets/greenway-trails/records?where=%22existing%22&limit=20';  

const searchTrails = async (query, pageNumber = 1) => {
    try {
        const response = await axios.get(API_ENDPOINT, {
            params: {
                q: query,
                page: pageNumber
            }
        });


        console.log("API Response:", response.data);
        return response.data.results || [];

    } catch (error) {
        throw new Error(`Failed to fetch trails: ${error.message}`);
    }
};

module.exports = { searchTrails };