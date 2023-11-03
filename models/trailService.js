const axios = require('axios');

const fetchTrails = async (page = 1) => {
    try {
        const apiUrl = `https://data.townofcary.org/api/explore/v2.1/catalog/datasets/greenway-trails/records?limit=20&page=${page}&refine=status%3A%22Existing%22`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching trail data:', error);
        throw error;
    }
};

module.exports = { fetchTrails };
