const axios = require('axios');

const interactWithAgent = async (req, res) => {
    try {
        const { agentId } = req.params;
        const { message } = req.body;

        console.log('Sending request to agent:', agentId);
        console.log('Message:', message);

        // Use API_KEY from environment variables
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API_KEY environment variable is not set');
        }

        const response = await axios.post(
            `https://eu-vg-edge.moeaymandev.workers.dev/agents/${agentId}/interact/random`,
            {
                action: {
                    type: "text",
                    payload: message
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('API Response:', response.data);

        // Find the last bot message from the turns array
        if (response.data && response.data.turns) {
            const botTurns = response.data.turns.filter(turn => turn.from === "bot");
            const lastBotTurn = botTurns[botTurns.length - 1];
            
            if (lastBotTurn && lastBotTurn.messages) {
                // Find the text message (not debug:tell)
                const textMessage = lastBotTurn.messages.find(msg => 
                    msg.type === "text" && 
                    msg.item && 
                    msg.item.payload && 
                    msg.item.payload.message
                );

                if (textMessage) {
                    const content = textMessage.item.payload.message;
                    console.log('Extracted bot message:', content);
                    res.json({ content });
                } else {
                    console.log('No text message found in bot turn');
                    res.json({ content: "Sorry, I couldn't process that." });
                }
            } else {
                console.log('No valid bot messages found');
                res.json({ content: "Sorry, I couldn't process that." });
            }
        } else {
            console.log('No turns array in response');
            res.json({ content: "Sorry, I couldn't process that." });
        }
    } catch (error) {
        console.error('Error interacting with agent:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to interact with agent',
            details: error.message,
            content: "Sorry, there was an error processing your message. Please try again later."
        });
    }
};

module.exports = {
    interactWithAgent
}; 