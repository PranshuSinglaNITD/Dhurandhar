require('dotenv').config();

module.exports = {
    govApiKey: process.env.GOV_API_KEY,
    mandiResourceId: process.env.MANDI_RESOURCE_ID,
    port: process.env.PORT || 3000,
    baseUrl: "https://api.data.gov.in/resource"
};