const axios = require('axios');

const makeCall = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        
        // Make the API call to Tixiea
        const response = await axios.post('https://eu-gcp-api.vg-stuff.com/v3/calls', {
            to: phoneNumber,
            agentId: "rv2sad5wvcwt8cip"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error making call:', error);
        res.status(500).json({ 
            error: 'Failed to initiate call',
            details: error.response?.data || error.message 
        });
    }
};

module.exports = {
    makeCall
}; 