const config = require('../config/apiConfig');

const fetchMandiPrices = async (req, res) => {
    try {
        const { state, district, crop, limit = 10 } = req.query;
        const url = new URL(`${config.baseUrl}/${config.mandiResourceId}`);
        url.searchParams.append("api-key", config.govApiKey);
        url.searchParams.append("format", "json");
        url.searchParams.append("limit", limit);

        if (state) url.searchParams.append("filters[state.keyword]", state);
        if (district) url.searchParams.append("filters[district]", district);
        if (crop) url.searchParams.append("filters[commodity]", crop);

        console.log(`Fetching from: ${url.toString()}`);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Gov API responded with status: ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            total_records: data.total,
            records: data.records
        });

    } catch (error) {
        console.error("Error in fetchMandiPrices:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Mandi data",
            error: error.message
        });
    }
};

module.exports = { fetchMandiPrices };