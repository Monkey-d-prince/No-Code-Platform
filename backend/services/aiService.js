const axios = require("axios");

exports.processText = async (prompt) => {
    const response = await axios.post(process.env.AI_API_URL, { prompt }, {
        headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
    });
    return response.data;
};
