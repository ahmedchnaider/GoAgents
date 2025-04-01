import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../api/config';

const LandingPage = () => {
    const navigate = useNavigate();

    const handlePhoneCall = async (phoneNumber) => {
        try {
            const response = await fetch(endpoint('/api/tixiea/call'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phoneNumber })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Call initiated:', data);
            // You can add UI feedback here
        } catch (error) {
            console.error('Error initiating call:', error);
            // Handle error appropriately
        }
    };

    const handleChatMessage = async (message) => {
        try {
            // Get the current business model from the iframe
            const iframe = document.querySelector('iframe');
            const currentModel = iframe?.contentWindow?.currentBusinessModel || 'influencer';
            
            // Map business models to agent IDs
            const agentIds = {
                'influencer': 'z5Doy15F7X2L4aOy1EOv',
                'themepages': 'byOtkIyMEY5GIhD',
                'dropshipper': 'szTb6eGNjla2iTx3hcu6',
                'community': 'community-agent-id',
                'tiktok': 'tiktok-agent-id'
            };

            const agentId = agentIds[currentModel] || 'z5Doy15F7X2L4aOy1EOv';
            console.log('Sending message to agent:', agentId);

            const response = await fetch(endpoint(`/api/agent/interact/${agentId}`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    action: {
                        type: 'text',
                        payload: message
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received response:', data);
            
            // Send the response back to the iframe
            if (iframe && iframe.contentWindow) {
                const content = data.content || "Sorry, I couldn't process that.";
                console.log('Sending content to iframe:', content);
                iframe.contentWindow.postMessage({
                    type: 'chatResponse',
                    content: content
                }, '*');
            }
        } catch (error) {
            console.error('Error handling chat message:', error);
            // Send error message back to iframe
            const iframe = document.querySelector('iframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({
                    type: 'chatError',
                    content: "Sorry, there was an error processing your message. Please try again later."
                }, '*');
            }
        }
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data === 'navigateToSignup') {
                navigate('/signup');
            } else if (event.data === 'navigateToSignin') {
                // Redirect to the solutions.tixaeagents.ai sign-in page
                window.location.href = process.env.REACT_APP_DASHBOARD_URL || 'https://solutions.tixaeagents.ai/app/eu/client';
            } else if (event.data === 'navigateToOmniChat') {
                // Navigate to the new Omni-channel Chat page
                navigate('/capabilities/omni-chat');
            } else if (event.data === 'navigateToOmniPhone') {
                // Navigate to the new Phone Calls page
                navigate('/capabilities/phone-calls');
            } else if (event.data === 'navigateToOmnitools') {
                // Navigate to the new Tools page
                navigate('/capabilities/tools');
            } else if (event.data.type === 'initiateCall') {
                handlePhoneCall(event.data.phoneNumber);
            } else if (event.data.type === 'chatMessage') {
                // Handle chat messages
                handleChatMessage(event.data.message);
            }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    return (
        <div style={{ width: '100%', height: '99vh', border: 'none' }}>
            <iframe
                src="/inde.html"
                title="Landing Page"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};

export default LandingPage;