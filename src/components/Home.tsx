import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// API base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add a CSS keyframe animation for the shaking phone
const shakePhoneStyle = `
  @keyframes shakePhone {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }
  .shake-phone {
    display: inline-block;
    animation: shakePhone 0.5s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0.5; }
  }
`;

// Map of business model IDs to their respective agent IDs
const AGENT_IDS = {
  community: 'tTKtg6VdMS9UKvKg2WtU',
  dropshippers: 'szTb6eGNjla2iTx3hcu6',
  themepages: 'byOtkIyMEY5GIhD',
  influencers: 'z5Doy15F7X2L4aOy1EOv'
};

const Home: React.FC = () => {
  // State for fade-in animation
  const [isLoaded, setIsLoaded] = useState(false);
  // Add navigate for routing
  const navigate = useNavigate();
  
  // Add state for user input and chat messages
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'agent', content: string}>>([]);
  
  // Add state for selected plan, tooltip, and pricing
  const [selectedPlan, setSelectedPlan] = useState('gold'); // Default to gold plan
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [basePlanPrice, setBasePlanPrice] = useState(99); // Default to gold plan price
  const [extraCredits, setExtraCredits] = useState(0);
  
  // Add keyframes for floating animation for the agent
  useEffect(() => {
    // Create a style element for the animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes float {
        0% { transform: translateX(-50%) translateY(0px); }
        50% { transform: translateX(-50%) translateY(-8px); }
        100% { transform: translateX(-50%) translateY(0px); }
      }
      ${shakePhoneStyle}
    `;
    // Add the style element to the head
    document.head.appendChild(styleElement);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Add refs for section scrolling
  const demoRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const agentTemplatesRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement | null> | null) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Add state for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Add state for background image and current business model
  const [selectedBgImage, setSelectedBgImage] = useState('influencer.jpg');
  const [currentBusinessModel, setCurrentBusinessModel] = useState('influencers');
  
  // Add these before the return statement
  const [currentSlide, setCurrentSlide] = useState(3);
  const [currentSuccessStorySlide, setCurrentSuccessStorySlide] = useState(0);
  const [toolsPosition, setToolsPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  // Define an array of automation tools
  const automationTools = [
    { icon: '🤖', text: 'Chat Bot' },
    { icon: '📅', text: 'Schedule' },
    { icon: '📞', text: 'Make Call' },
    { icon: '📧', text: 'Email' },
    { icon: '🖼️', text: 'Generate Images' },
    { icon: '📲', text: 'SMS' },
    { icon: '🔄', text: 'Repost Reels' },
    { icon: '📸', text: 'Generate Reels' },
    { icon: '💬 ', text: 'Comments Reply' },
    { icon: '📢', text: 'Phone Campaigns' },
    { icon: '🧠', text: 'Lead Qualification' },
    { icon: '👥', text: 'Lead Capture' },
    { icon: '🔔', text: 'Alert Notifications' },
    { icon: '💲', text: 'Invoice Generator' }
  ];

  // Effect for fade-in animation
  useEffect(() => {
    setIsLoaded(true);

    // Initialize the chat widget from external script if available
    const initializeWidget = () => {
      // Create VG_CONFIG for the chat widget
      (window as any).VG_CONFIG = {
        ID: "tTKtg6VdMS9UKvKg2WtU", // YOUR AGENT ID
        region: 'eu', // YOUR ACCOUNT REGION 
        render: 'bottom-right', // can be 'full-width' or 'bottom-left' or 'bottom-right'
        stylesheets: [
          "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
        ],
      };

      // Load the chat widget script
      const script = document.createElement("script");
      script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
      script.defer = true;
      document.body.appendChild(script);
    };

    // Initialize the widget when component mounts
    initializeWidget();
  }, []);

  // Add this useEffect for tools animation
  useEffect(() => {
    const animateTools = () => {
      setToolsPosition((prev) => (prev <= -100 ? 0 : prev - 0.1)); // Slower animation
    };

    const animation = setInterval(animateTools, 30); // Slightly faster animation
    return () => clearInterval(animation);
  }, []);

  const handleSlide = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Update the slider to allow 7 slides (0-6 indices) instead of just 5
    const totalSlides = 7;
    const newSlide = direction === 'left' 
      ? (currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
      : (currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    
    setCurrentSlide(newSlide);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Separate handler for success stories slider (5 slides)
  const handleSuccessStoriesSlide = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Success stories has exactly 5 items
    const totalSuccessStories = 5;
    const newSlide = direction === 'left' 
      ? (currentSuccessStorySlide === 0 ? totalSuccessStories - 1 : currentSuccessStorySlide - 1)
      : (currentSuccessStorySlide === totalSuccessStories - 1 ? 0 : currentSuccessStorySlide + 1);
    
    setCurrentSuccessStorySlide(newSlide);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Company logos array
  const companyLogos = [
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
    { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
    { name: 'WhatsApp', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
    { name: 'Discord', logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png' },
    { name: 'Telegram', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg' },
    { name: 'Gmail', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg' }
  ];

  // Define the business model type
  type BusinessModel = {
    id: string;
    title: string;
    color: string;
    bgImage: string;
    icon: React.ReactNode;
    profileImage: string;
    name: string;
    initialMessage: string;
    productImage: string;
  };

  // Business models data
  const businessModels = [
    {
      id: 'dropshippers',
      title: 'Dropshippers',
      color: currentBusinessModel === 'dropshippers' ? '#2937f0' : '#1a1a1a',
      bgImage: 'dropshippers.jpg',
      icon: (
        <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#2937f0"/>
        </svg>
      ),
      profileImage: 'store.jpg',
      name: 'CatToy Store',
      initialMessage: "Hey there! 👋 Welcome to our store!\nCheck out our hot seller—the Interactive Laser & Feather Cat Toy!",
      productImage: 'cattoy.jpg'
    },
    {
      id: 'themepages',
      title: 'Theme Pages',
      color: currentBusinessModel === 'themepages' ? '#2937f0' : '#1a1a1a',
      bgImage: 'themepages.jpg',
      icon: (
        <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 11h16v2H4v-2zm0-4h16v2H4V7zm0 8h16v2H4v-2z" fill="#2937f0"/>
          <path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h16V5H4z" fill="#2937f0"/>
        </svg>
      ),
      profileImage: 'travel.jpg',
      name: 'Real World University',
      initialMessage: "Hey Welcome to Real World University! 🎓\nWe're excited to have you on board to Excape the Matrix!\nLet's get you started with your first course.",
      productImage: 'themehat.jpg'
    },
    {
      id: 'influencers',
      title: 'Influencers',
      color: currentBusinessModel === 'influencers' ? '#2937f0' : '#1a1a1a',
      bgImage: 'influencer.jpg',
      icon: (
        <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#2937f0"/>
        </svg>
      ),
      profileImage: 'influ.jpg',
      name: 'Lilly',
      initialMessage: "Hey! 💫 Just posted a new makeup tutorial on my page.\nCheck it out and let me know what you think!",
      productImage: 'influencerchat.jpg'
    },
    {
      id: 'community',
      title: 'Community Builders',
      color: currentBusinessModel === 'community' ? '#2937f0' : '#1a1a1a',
      bgImage: 'community.jpg',
      icon: (
        <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#2937f0"/>
        </svg>
      ),
      profileImage: 'images.png',
      name: 'AI Mentor',
      initialMessage: "Welcome to our community! 🌐\nWe've got over 5,000 members discussing tech innovation daily!",
      productImage: 'communitychat.jpg'
    }
  ];

  // Remove the CSS keyframe animation from this useEffect since we moved it to the top
  useEffect(() => {
    if (isMobile) {
      // Add CSS to hide scrollbar for the entire body
      document.body.classList.add('hide-scrollbar');
      document.documentElement.classList.add('hide-scrollbar');
      
      // Apply inline styles directly for more aggressive scrollbar hiding
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.scrollbarWidth = 'none';
      document.documentElement.style.scrollbarWidth = 'none';
      // Use proper TypeScript cast for IE/Edge specific property
      (document.body.style as any).msOverflowStyle = 'none';
      (document.documentElement.style as any).msOverflowStyle = 'none';
    } else {
      document.body.classList.remove('hide-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
      
      // Remove inline styles when not mobile
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      document.body.style.scrollbarWidth = '';
      document.documentElement.style.scrollbarWidth = '';
      // Use proper TypeScript cast for IE/Edge specific property
      (document.body.style as any).msOverflowStyle = '';
      (document.documentElement.style as any).msOverflowStyle = '';
    }
    
    return () => {
      // Clean up
      document.body.classList.remove('hide-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
      
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      document.body.style.scrollbarWidth = '';
      document.documentElement.style.scrollbarWidth = '';
      // Use proper TypeScript cast for IE/Edge specific property
      (document.body.style as any).msOverflowStyle = '';
      (document.documentElement.style as any).msOverflowStyle = '';
    };
  }, [isMobile]);

  // Handler for business model selection
  const handleSelectBusinessModel = (model: BusinessModel) => {
    setSelectedBgImage(model.bgImage);
    // Store the current selected business model ID
    setCurrentBusinessModel(model.id);
    
    // Reset chat to only show the initial message for this business model
    setChatMessages([]);
  };

  // Get message content for each business model
  const getBusinessModelContent = (modelId: string) => {
    const model = businessModels.find(m => m.id === modelId);
    return model?.initialMessage || "Hey there! How can I help you today?";
  };

  // Function to handle sending a message to the agent
  const handleSendMessage = async () => {
    // Validate input
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const userMessage = { type: 'user' as const, content: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    const messageToSend = userInput;
    setUserInput('');
    setIsLoading(true);
    
    try {
      // Map business models to agent IDs
      const agentIds: Record<string, string> = {
        'influencers': 'z5Doy15F7X2L4aOy1EOv',
        'themepages': 'byOtkIyMEY5GIhD',
        'dropshippers': 'szTb6eGNjla2iTx3hcu6',
        'community': 'community-agent-id'
      };
      
      const agentId = agentIds[currentBusinessModel] || 'z5Doy15F7X2L4aOy1EOv';
      
      // Make API call to backend
      const response = await fetch(`${API_URL}/api/agent/interact/${agentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageToSend,
          action: {
            type: 'text',
            payload: messageToSend
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const agentResponse = { 
        type: 'agent' as const, 
        content: data.content || "Sorry, I couldn't process that." 
      };
      
      setChatMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error sending message to agent:', error);
      // Add error message
      const errorResponse = { 
        type: 'agent' as const, 
        content: "Sorry, there was an error processing your message. Please try again later." 
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle AI call request
  const handleAICallRequest = async () => {
    // Validate form fields
    if (!fullName.trim()) {
      setCallStatus({ success: false, message: 'Please enter your full name' });
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setCallStatus({ success: false, message: 'Please enter a valid email address' });
      return;
    }
    
    if (!phoneNumber.trim()) {
      setCallStatus({ success: false, message: 'Please enter your phone number' });
      return;
    }
    
    // Set loading state
    setIsCallLoading(true);
    setCallStatus(null);
    
    try {
      // Format the phone number with country code
      const formattedPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
      
      // Save user data to Firestore 'leads' collection
      const userDataResponse = await fetch(`${API_URL}/api/tixiea/save-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber: formattedPhoneNumber,
          source: 'voice-assistant',
          timestamp: new Date().toISOString()
        }),
      });
      
      if (!userDataResponse.ok) {
        console.error('Error saving lead data:', await userDataResponse.json());
        // Continue with call even if saving lead fails
      }
      
      // Call the makeCall API endpoint
      const response = await fetch(`${API_URL}/api/tixiea/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedPhoneNumber,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCallStatus({ 
          success: true, 
          message: 'Your call has been initiated! You will receive a call shortly.' 
        });
        
        // Reset form fields on success
        setFullName('');
        setEmail('');
        setPhoneNumber('');
      } else {
        setCallStatus({ 
          success: false, 
          message: data.error || 'Failed to initiate call. Please try again later.' 
        });
      }
    } catch (error) {
      console.error('Error initiating AI call:', error);
      setCallStatus({ 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      });
    } finally {
      setIsCallLoading(false);
    }
  };
  
  // Function to handle newsletter subscription
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setSubscriptionStatus({ success: false, message: 'Please enter a valid email address' });
      return;
    }
    
    // Set loading state
    setIsSubscribing(true);
    setSubscriptionStatus(null);
    
    try {
      // Save email to Firestore 'leads' collection
      const response = await fetch(`${API_URL}/api/tixiea/save-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          source: 'newsletter',
          timestamp: new Date().toISOString()
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubscriptionStatus({ 
          success: true, 
          message: 'Thank you for subscribing to our newsletter!' 
        });
        
        // Reset form field on success
        setNewsletterEmail('');
        
        // Show success animation
        setSubscriptionSuccess(true);
        setTimeout(() => setSubscriptionSuccess(false), 3000);
      } else {
        setSubscriptionStatus({ 
          success: false, 
          message: data.error || 'Failed to subscribe. Please try again later.' 
        });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setSubscriptionStatus({ 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Add state for AI Voice Assistant form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Add state for newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Add refs for videos
  const createVideoRef = useRef<HTMLVideoElement>(null);
  const deployVideoRef = useRef<HTMLVideoElement>(null);
  const monitorVideoRef = useRef<HTMLVideoElement>(null);
  
  // Set up Intersection Observer for videos
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          if (video.paused) {
            video.play().catch(error => {
              console.log('Autoplay prevented:', error);
            });
          }
        } else {
          const video = entry.target as HTMLVideoElement;
          if (!video.paused) {
            video.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observe all video elements
    if (createVideoRef.current) observer.observe(createVideoRef.current);
    if (deployVideoRef.current) observer.observe(deployVideoRef.current);
    if (monitorVideoRef.current) observer.observe(monitorVideoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // For the shaking phone animation

  return (
    <div style={{
      overflow: isMobile ? 'hidden' : 'visible',
      width: '100%',
      height: '100%',
    }}>
      {/* Hero Section Container */}
    <div style={{
      width: '100%',
      height: '100vh', // Fixed height for hero section
      backgroundImage: 'url("/assets/img/Herobg.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      {/* Header - Exactly like in the reference photo */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: 'white',
        height: '60px',
        borderBottom: '1px solid #f8f9fa',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
      }}>
        <div className="container-fluid" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 20px',
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/assets/img/logo.png" alt="AI Agent Platform Logo" style={{ height: '37px' }} />
          </a>

          {/* Navigation - Center aligned */}
          <ul style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <li><button 
              onClick={() => scrollToSection(integrationsRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Integrations</span>
            </button></li>
            <li><button 
              onClick={() => scrollToSection(demoRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Demo</span>
            </button></li>
            <li><button 
              onClick={() => scrollToSection(capabilitiesRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Capabilities</span>
            </button></li>
            <li><button 
              onClick={() => scrollToSection(agentTemplatesRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Agents</span>
            </button></li>
            <li><button 
              onClick={() => scrollToSection(featuresRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Features</span>
            </button></li>
            <li><button 
              onClick={() => scrollToSection(pricingRef)} 
              style={{ color: '#000', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              <span style={{ display: isMobile ? 'none' : 'inline' }}>Pricing</span>
            </button></li>
          </ul>

          {/* Right aligned buttons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="https://solutions.tixaeagents.ai" style={{
              backgroundColor: '#2937f0',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '8px 16px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              <span style={{ marginRight: '6px' }}>
                <i className="bi-person-fill"></i>
              </span>
              Sign in
            </a>
            <button onClick={() => navigate('/signup')} style={{
              backgroundColor: '#2937f0',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              Start for Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matched exactly like in the reference */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        paddingTop: '180px',
      }}>
        {/* Center Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '1000px',
          padding: '0 20px',
          zIndex: 2,
        }}>
          {/* Product of the Day Badge */}
          <div style={{ 
            backgroundColor: '#f0f4f8',
            color: '#2937f0',
            padding: '12px 28px',
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: '50px',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '20px'})`,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: '0.1s',
          }}>
            <span style={{ color: '#ffd700', marginRight: '10px', fontSize: '22px' }}>🏆</span>
            <span style={{ fontSize: '16px', color: '#2937f0', fontWeight: 600 }}>#2 Product of the Day</span>
          </div>

          {/* Main Heading - exactly like reference but bigger */}
          <h1 style={{ 
            fontSize: isMobile ? '48px' : '72px',
            fontWeight: 'bold',
            lineHeight: 1.1,
            margin: '0 0 30px 0',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '30px'})`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.2s',
          }}>
            Easiest  Way To Create
            {isMobile ? (
              <span style={{ color: '#2937f0', display: 'block', marginTop: '10px' }}>AI AGENTS</span>
            ) : (
              <>
                <br />
                <span style={{ color: '#2937f0' }}>AI AGENTS</span>
              </>
            )}
          </h1>

          {/* Description Text */}
          <p style={{ 
            fontSize: isMobile ? '18px' : '22px',
            color: '#666',
            lineHeight: 1.5,
            marginBottom: isMobile ? '40px' : '50px',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '30px'})`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.3s',
          }}>
            Deploy intelligence across Instagram, Telegram, WhatsApp, Discord, and phone calls.
            {isMobile ? (
              " All to Maximize your Profits."
            ) : (
              <>
                <br />
                All to Maximize your Profits.
              </>
            )}
          </p>

          {/* Call to Action Buttons */}
          <div style={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '15px' : '25px',
            marginBottom: isMobile ? '40px' : '60px',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '280px' : 'none',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '30px'})`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.4s',
          }}>
            <button onClick={() => {
              // Scroll to chat interface demo section
              const demoSection = document.getElementById('demo');
              demoSection?.scrollIntoView({ behavior: 'smooth' });
            }} style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: isMobile ? '18px 38px' : '16px 38px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: isMobile ? 'all 0.3s ease' : 'background-color 0.3s, color 0.3s',
              width: isMobile ? '100%' : 'auto',
              boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
              e.currentTarget.style.border = '1px solid black';
              if (isMobile) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'black';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.border = 'none';
              if (isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}>
              Speak To Agent
            </button>
            <button onClick={() => navigate('/signup')} style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              borderRadius: '30px',
              padding: isMobile ? '18px 38px' : '16px 38px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: isMobile ? 'all 0.3s ease' : 'background-color 0.3s, color 0.3s',
              width: isMobile ? '100%' : 'auto',
              boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'black';
              e.currentTarget.style.color = 'white';
              if (isMobile) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
              if (isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }
            }}>
              CREATE ONE
            </button>
          </div>

          {/* Trusted by text */}
          <p style={{ 
            fontSize: '16px', 
            color: '#777', 
            marginBottom: '25px',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '20px'})`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.5s',
          }}>
            Trusted by leading companies worldwide
          </p>

          {/* Company Logos */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '35px',
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? '0' : '20px'})`,
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.6s',
          }}>
            {companyLogos.map((company, index) => (
              <div key={index} style={{ 
                filter: 'grayscale(100%)', 
                opacity: 0.6, 
                transition: 'all 0.3s ease',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%)';
                e.currentTarget.style.opacity = '0.6';
              }}>
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  style={{ maxWidth: '100%', maxHeight: '100%' }} 
                />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Now outside hero container */}
      <div style={{
        padding: '60px 20px',
        backgroundColor: 'white',
        width: '100%',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
        }}>
          How It Works
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '10px',
          maxWidth: '600px',
          margin: '0 auto 0px',
          textAlign: 'center',
        }}>
          Create and deploy AI under 10 minutes with our simple 3-step process
        </p>

        <div style={{
          display: isMobile ? 'flex' : 'flex',
          flexDirection: isMobile ? 'row' : 'row',
          justifyContent: 'center',
          gap: isMobile ? '0px' : '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          overflowX: isMobile ? 'auto' : 'visible',
          overflowY: isMobile ? 'hidden' : 'visible',
          padding: isMobile ? '20px 0' : '0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        className={isMobile ? "hide-scrollbar" : ""}
        >
          {/* Step 1 */}
          <div style={{
            flex: isMobile ? '0 0 auto' : '1',
            width: isMobile ? '150px' : 'auto',
            minWidth: isMobile ? '150px' : '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            padding: isMobile ? '20px 15px' : '40px 30px',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(-10px)';
          }}
          onMouseOut={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: isMobile ? '50px' : '70px',
              height: isMobile ? '50px' : '70px',
              backgroundColor: '#2937f0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}>
              <svg width={isMobile ? "25" : "35"} height={isMobile ? "25" : "35"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
                <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="white"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 'bold',
              margin: isMobile ? '0' : '0 0 15px 0',
              color: '#1a1a1a',
            }}>
              1. Choose Persona
            </h3>
            {/* Description text only shown on desktop */}
            {!isMobile && (
              <p style={{
                fontSize: '16px',
                color: '#666',
                margin: '15px 0 0',
                lineHeight: '1.5',
              }}>
                Select an AI personality that matches your business needs. Customize voice, tone, and knowledge base.
              </p>
            )}
          </div>

          {/* Step 2 */}
          <div style={{
            flex: isMobile ? '0 0 auto' : '1',
            width: isMobile ? '150px' : 'auto',
            minWidth: isMobile ? '150px' : '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            padding: isMobile ? '20px 15px' : '40px 30px',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(-10px)';
          }}
          onMouseOut={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: isMobile ? '50px' : '70px',
              height: isMobile ? '50px' : '70px',
              backgroundColor: '#2937f0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}>
              <svg width={isMobile ? "25" : "35"} height={isMobile ? "25" : "35"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5Z" stroke="white" strokeWidth="2"/>
                <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 17H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 'bold',
              margin: isMobile ? '0' : '0 0 15px 0',
              color: '#1a1a1a',
            }}>
              2. Add Knowledge
            </h3>
            {/* Description text only shown on desktop */}
            {!isMobile && (
              <p style={{
                fontSize: '16px',
                color: '#666',
                margin: '15px 0 0',
                lineHeight: '1.5',
              }}>
                Upload documents, connect to your website, or provide text to train your agent with relevant information.
              </p>
            )}
          </div>

          {/* Step 3 */}
          <div style={{
            flex: isMobile ? '0 0 auto' : '1',
            width: isMobile ? '150px' : 'auto',
            minWidth: isMobile ? '150px' : '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            padding: isMobile ? '20px 15px' : '40px 30px',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(-10px)';
          }}
          onMouseOut={(e) => {
            if (!isMobile) e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              width: isMobile ? '50px' : '70px',
              height: isMobile ? '50px' : '70px',
              backgroundColor: '#2937f0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}>
              <svg width={isMobile ? "25" : "35"} height={isMobile ? "25" : "35"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                <path d="M12 5V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 21V19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 12H5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 'bold',
              margin: isMobile ? '0' : '0 0 15px 0',
              color: '#1a1a1a',
            }}>
              3. Deploy
            </h3>
            {/* Description text only shown on desktop */}
            {!isMobile && (
              <p style={{
                fontSize: '16px',
                color: '#666',
                margin: '15px 0 0',
                lineHeight: '1.6',
              }}>
                Deploy your AI agent across multiple platforms with a single click. Monitor performance in real-time.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Business Models Chat Interface Section */}
      <div ref={demoRef} id="demo" style={{
        padding: '75px 20px',
        backgroundColor: '#f8f9fa',
        width: '100%',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1a1a1a',
          textAlign: 'center',
        }}>
          Designed for Any Business Model
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '60px',
          maxWidth: '800px',
          margin: '0 auto 40px',
          textAlign: 'center',
        }}>
          Our AI agents are versatile and adaptable to various business types and online platforms
        </p>

        {/* Business Model Types */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          flexDirection: isMobile ? 'row' : undefined,
          overflowX: isMobile ? 'auto' : undefined,
          overflowY: isMobile ? 'hidden' : undefined,
          justifyContent: 'center',
          gap: isMobile ? '0px' : '50px',
          maxWidth: '1200px',
          margin: '20px auto 20px',
          padding: isMobile ? '15px' : '30px 20px',
          position: 'relative',
          zIndex: 2,
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
          WebkitOverflowScrolling: 'touch',
        }}
        className={isMobile ? "hide-scrollbar" : ""}
        >
          {businessModels.map((model) => (
            <div key={model.id} style={{
              textAlign: 'center',
              width: isMobile ? '120px' : '100%',
              flexShrink: isMobile ? 0 : undefined,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }} onClick={() => handleSelectBusinessModel(model)}>
              <div style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                backgroundColor: 'white',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                {model.icon}
              </div>
              <h3 style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                color: model.color,
              }}>{model.title}</h3>
            </div>
          ))}
        </div>

        {/* Chat Interface Container with Background */}
        <div style={{
          position: 'relative',
          width: '100%',
          backgroundImage: `url(/assets/img/${selectedBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.5s ease',
        }}>
          {/* Overlay - much more transparent now */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.09)',
          }} />

          {/* Chat Interface Preview */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(1, 90, 255, 0.19)',
            overflow: 'hidden',
            height: isMobile ? '600px' : '700px',
            position: 'relative',
            zIndex: 1,
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            {/* Left Sidebar - Hidden on mobile */}
            {!isMobile && (
              <div style={{
                width: '350px',
                borderRight: '1px solid rgba(239, 239, 239, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '0',
              }}>
                {/* Chat Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid #efefef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <img 
                      src="/assets/img/logo.png"
                      alt="AI Assistant"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                      }}
                    />
                    <span style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}>AI Chats</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                  }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#2937f0',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Search Box */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #efefef',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '8px 12px',
                    gap: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999">
                      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search conversations" 
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                {/* Chat List */}
                <div style={{ height: '500px', overflowY: 'auto' }}>
                  {/* Business Model Chats */}
                  {businessModels.map((model) => (
                    <div 
                      key={model.id}
                      onClick={() => handleSelectBusinessModel(model)}
                      style={{
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        backgroundColor: currentBusinessModel === model.id ? '#f0f2ff' : 'transparent',
                        borderLeft: currentBusinessModel === model.id ? '2px solid #2937f0' : 'none',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={(e) => {
                        if (currentBusinessModel !== model.id) {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (currentBusinessModel !== model.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <img 
                        src={`/assets/img/${model.profileImage}`}
                        alt={model.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: currentBusinessModel === model.id ? 'bold' : '500',
                          fontSize: '14px',
                          marginBottom: '4px',
                          color: currentBusinessModel === model.id ? '#2937f0' : '#333',
                        }}>{model.name}</div>
                        <div style={{
                          fontSize: '13px',
                          color: '#666',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {model.initialMessage.substring(0, 28)}...
                        </div>
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#999',
                      }}>
                        Just now
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right Side - Chat Area */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              minWidth: isMobile ? '100%' : '800px',
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #efefef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <img 
                    src={`/assets/img/${businessModels.find(m => m.id === currentBusinessModel)?.profileImage || 'user1.jpg'}`}
                    alt="Profile"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                    }}
                  />
                  <div>
                    <div style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}>{businessModels.find(m => m.id === currentBusinessModel)?.name || 'Sarah Johnson'}</div>
                    <div style={{
                      fontSize: '13px',
                      color: '#65B741',
                    }}>Active now</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '20px',
                }}>
                  {/* Voice Call Button with shaking phone emoji */}
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#2937f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '15px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(41, 55, 240, 0.08)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(41, 55, 240, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(41, 55, 240, 0.08)';
                  }}>
                    <span className="shake-phone">📞</span> Voice Call
                  </button>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#2937f0',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M15 10l-4 4l6 6l4-16l-16 4l6 6l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#2937f0',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1,
                padding: '20px',
                backgroundColor: '#ffffff',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: isMobile ? '430px' : '580px',
              }}>
                {/* Business Model Initial Message with Image and Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <img 
                    src={`/assets/img/${businessModels.find(m => m.id === currentBusinessModel)?.profileImage || 'logo.png'}`}
                    alt="Business Profile"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                    }}
                  />
                  <div style={{
                    maxWidth: '70%',
                  }}>
                    <div style={{
                      backgroundColor: '#f0f2ff',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      fontSize: '14px',
                      color: '#1a1a1a',
                      marginBottom: '10px',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    }}>
                      {getBusinessModelContent(currentBusinessModel)}
                    </div>
                    
                    {/* Product Image */}
                    <div style={{
                      width: '220px',
                      height: '160px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                    }}>
                      <img 
                        src={`/assets/img/${businessModels.find(m => m.id === currentBusinessModel)?.productImage || 'product.jpg'}`}
                        alt="Product"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                    }}>
                      <button style={{
                        backgroundColor: '#2937f0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '18px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}>
                        Learn More
                      </button>
                      <button style={{
                        backgroundColor: 'white',
                        color: '#2937f0',
                        border: '1px solid #2937f0',
                        borderRadius: '18px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}>
                        {currentBusinessModel === 'dropshippers' ? 'Shop Now' : 
                         currentBusinessModel === 'themepages' ? 'Call AI Top G' : 
                         currentBusinessModel === 'influencers' ? 'See Tutorial' : 'Join Community'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Chat Messages */}
                {chatMessages.map((msg, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  }}>
                    {msg.type === 'agent' && (
                      <img 
                        src={`/assets/img/${businessModels.find(m => m.id === currentBusinessModel)?.profileImage || 'logo.png'}`}
                        alt="Business Profile"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                    <div style={{
                      backgroundColor: msg.type === 'user' ? '#2937f0' : '#f0f2ff',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      fontSize: '14px',
                      color: msg.type === 'user' ? 'white' : '#1a1a1a',
                      maxWidth: '70%',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    }}>
                      {msg.content}
                    </div>
                    {msg.type === 'user' && (
                      <img 
                        src="/assets/img/logo.png"
                        alt="User"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                  }}>
                    <img 
                      src={`/assets/img/${businessModels.find(m => m.id === currentBusinessModel)?.profileImage || 'logo.png'}`}
                      alt="Business Profile"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{
                      backgroundColor: '#f0f2ff',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      fontSize: '14px',
                      color: '#1a1a1a',
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                      }}>
                        <div style={{ 
                          width: '6px', 
                          height: '6px', 
                          backgroundColor: '#2937f0', 
                          borderRadius: '50%',
                          animation: 'pulse 1s infinite',
                        }}></div>
                        <div style={{ 
                          width: '6px', 
                          height: '6px', 
                          backgroundColor: '#2937f0', 
                          borderRadius: '50%',
                          animation: 'pulse 1s infinite 0.2s',
                        }}></div>
                        <div style={{ 
                          width: '6px', 
                          height: '6px', 
                          backgroundColor: '#2937f0', 
                          borderRadius: '50%',
                          animation: 'pulse 1s infinite 0.4s',
                        }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div style={{
                padding: '16px',
                borderTop: '1px solid #efefef',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'white',
              }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#2937f0',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="2"/>
                  </svg>
                </button>
                <input 
                  type="text"
                  placeholder="Message..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    padding: '8px 12px',
                    backgroundColor: '#f0f2ff',
                    borderRadius: '20px',
                  }}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#2937f0',
                    opacity: isLoading || !userInput.trim() ? 0.5 : 1,
                  }}
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Platform Integrations Section */}
      <div ref={integrationsRef} style={{
        padding: '80px 20px',
        backgroundColor: 'white',
        width: '100%',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
        }}>
          Seamless Platform Integrations
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '60px',
          maxWidth: '800px',
          margin: '0 auto 0px',
          textAlign: 'center',
        }}>
          Our AI agents integrate effortlessly with popular platforms and communication channels:
        </p>

        {/* Integrations Image */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <img 
            src="/assets/img/integrations.png"
            alt="Platform Integrations"
            style={{
              width: '100%',
              maxWidth: '1100px',
              height: 'auto',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Additional Support Text */}
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginTop: '40px',
          maxWidth: '800px',
          margin: '0px auto 0',
          textAlign: 'center',
        }}>
          Our AI agents also support phone calls, email, and SMS communications for comprehensive
          <br />
          customer engagement.
        </p>
      </div>

      {/* Create Your AI Agency Section */}
      <div style={{
        padding: '100px 20px',
        backgroundColor: '#f8f9fa',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '60px',
          flexWrap: 'wrap',
        }}>
          {/* Left side - Video */}
          <div style={{
            flex: '1',
            minWidth: '350px',
          }}>
            <div style={{
              position: 'relative',
              width: '450px',
              height: '750px', /* 9:16 aspect ratio */
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              margin: '0 auto',
            }}>
              <video
                
                loop
                playsInline
                ref={(el) => {
                  // Store video reference for play/pause control
                  if (el) {
                    (el as any)._reelVideo = true;
                  }
                }}
                style={{
                  width: '110%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <source src="/assets/img/reel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 10,
              }}>
                {/* Volume Toggle Button */}
                <button 
                  onClick={(e) => {
                    const video = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                    if (video) {
                      video.muted = !video.muted;
                      // Update button appearance based on mute state
                      const muteIcon = e.currentTarget.querySelector('.mute-icon');
                      const unmuteIcon = e.currentTarget.querySelector('.unmute-icon');
                      if (muteIcon && unmuteIcon) {
                        if (video.muted) {
                          muteIcon.setAttribute('style', 'display: block');
                          unmuteIcon.setAttribute('style', 'display: none');
                        } else {
                          muteIcon.setAttribute('style', 'display: none');
                          unmuteIcon.setAttribute('style', 'display: block');
                        }
                      }
                    }
                  }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                  }}
                  aria-label="Toggle sound"
                >
                  {/* Mute Icon (shown by default since video starts muted) */}
                  <svg className="mute-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                  {/* Unmute Icon (hidden by default) */}
                  <svg className="unmute-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }}>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
                
                {/* Play/Pause Button */}
                <button 
                  onClick={(e) => {
                    const video = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                    if (video) {
                      if (video.paused) {
                        video.play();
                        // Show pause icon
                        const playIcon = e.currentTarget.querySelector('.play-icon');
                        const pauseIcon = e.currentTarget.querySelector('.pause-icon');
                        if (playIcon && pauseIcon) {
                          playIcon.setAttribute('style', 'display: none');
                          pauseIcon.setAttribute('style', 'display: block');
                        }
                      } else {
                        video.pause();
                        // Show play icon
                        const playIcon = e.currentTarget.querySelector('.play-icon');
                        const pauseIcon = e.currentTarget.querySelector('.pause-icon');
                        if (playIcon && pauseIcon) {
                          playIcon.setAttribute('style', 'display: block');
                          pauseIcon.setAttribute('style', 'display: none');
                        }
                      }
                    }
                  }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                  }}
                  aria-label="Play or pause video"
                >
                  {/* Play Icon (hidden by default since video starts playing) */}
                  <svg className="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {/* Pause Icon (shown by default) */}
                  <svg className="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Text and CTA */}
          <div style={{
            flex: '1',
            minWidth: '350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              
              
            </div>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '24px',
            }}>
              Create Your AI Agency <span style={{ fontSize: '36px' }}>🚀</span>
            </h2>
            <p style={{
              fontSize: '19px',
              color: '#333',
              lineHeight: '1.7',
              marginBottom: '30px',
              fontWeight: '500',
            }}>
              Don't get left behind in the AI revolution! Launch your own AI agency and tap into the <span style={{ color: '#2937f0', fontWeight: 'bold' }}>multi-billion dollar AI market</span> while others struggle with traditional business models.
            </p>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              marginBottom: '35px',
            }}>
              <li style={{
                fontSize: '17px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#2937f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                  </svg>
                </div>
                Start with zero technical knowledge <span style={{ color: '#2937f0', marginLeft: '5px' }}>✨</span>
              </li>
              <li style={{
                fontSize: '17px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#2937f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                  </svg>
                </div>
                Build a 6-figure AI agency in months, not years <span style={{ color: '#ff9900', marginLeft: '5px' }}>💰</span>
              </li>
              <li style={{
                fontSize: '17px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
               
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#2937f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                  </svg>
                </div>
                Generate recurring revenue with subscription models <span style={{ color: '#2dc071', marginLeft: '5px' }}>💸</span>
              </li>
              <li style={{
                fontSize: '17px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#2937f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                  </svg>
                </div>
                Stay ahead while AI replaces traditional jobs <span style={{ color: '#ff4d4d', marginLeft: '5px' }}>⚡</span>
              </li>
              <li style={{
                fontSize: '17px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#2937f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                  </svg>
                </div>
                Be among the first to capitalize on the AI gold rush <span style={{ color: '#ffab00', marginLeft: '5px' }}>🔮</span>
              </li>
            </ul>
            <div style={{
              backgroundColor: '#c9ffcd',
              padding: '15px 20px',
              borderRadius: '12px',
              marginBottom: '25px',
              border: '1px dashed #34eb43',
            }}>
              <p style={{
                fontSize: '16px',
                color: '#333',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '22px', marginRight: '10px' }}>⚠️</span>
                <span><strong>Don't wait:</strong> AI is disrupting every industry. Position yourself as a provider, not a victim of automation.</span>
              </p>
            </div>
            <button onClick={() => navigate('/signup')} style={{
              backgroundColor: '#2937f0',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '18px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              maxWidth: '280px',
              boxShadow: '0 8px 20px rgba(41, 55, 240, 0.25)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(41, 55, 240, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(41, 55, 240, 0.25)';
            }}>
              Start Building Now 🚀
            </button>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '15px',
            }}>
              No credit card required • Limited time offer
            </p>
          </div>
        </div>
      </div>

      {/* AI Agent Templates Section */}
       <div ref={agentTemplatesRef} style={{
        padding: '80px 20px',
        backgroundColor: '#f8f9fa',
        width: '100%',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          AI Agent for Any Business Model 
        </h2>
        
        <p style={{
          fontSize: '20px',
          color: '#666',
          maxWidth: '800px',
          margin: '0 auto 40px',
          textAlign: 'center',
          lineHeight: '1.6',
        }}>
          Discover the perfect AI for your business ! Swipe to explore our Templates collection ✨
        </p>

        {/* Interactive Tags */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '30px',
          maxWidth: '1000px',
          margin: '0 auto 40px',
        }}>
        </div>

        {/* Slider Container - Responsive width for mobile */}
        <div style={{
          position: 'relative',
          width: '1200px',
          maxWidth: '100%',
          margin: '0 auto',
          overflow: 'visible',

        }}>
          {/* Navigation Arrows - Upgraded with animations */}
          <button
            style={{
              position: 'absolute',
              left: isMobile ? '5px' : '0px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}
            onClick={() => handleSlide('left')}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(41, 55, 240, 0.25)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-50%)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
              }
            }}
            aria-label="Previous agent"
          >
            <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="#2937f0">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button
            style={{
              position: 'absolute',
              right: isMobile ? '5px' : '-50px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}
            onClick={() => handleSlide('right')}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(41, 55, 240, 0.25)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-50%)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
              }
            }}
            aria-label="Next agent"
          >
            <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="#2937f0">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>

          {/* Main cards container with overflow visible */}
          <div style={{
            width: isMobile ? '100%' : '1200px',
            margin: isMobile ? '0' : '0 -27px',
            position: 'relative',
            overflow: 'visible',
          }}>
            {/* Cards Container */}
            <div 
              ref={slideRef}
              style={{
                display: 'flex',
                gap: '25px',
                transition: 'transform 0.5s ease',
                transform: `translateX(calc(-${currentSlide * 370}px + ${isMobile ? 
                  // For mobile, center the current slide with slight adjustment to the left
                  window.innerWidth/2 - 175 - 34
                  : 
                  // For desktop, maintain the existing calculation
                  425
                }px))`,
                width: 'fit-content',
              }}
            >
              {/* Real Estate Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 0 ? 'blur(0)' : 
                       (currentSlide === 1 || currentSlide === 6 ? 'blur(1px)' : 
                       (currentSlide === 2 || currentSlide === 5 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 0 ? 1 : 
                        (currentSlide === 1 || currentSlide === 6 ? 0.9 : 
                        (currentSlide === 2 || currentSlide === 5 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 0 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 0 && currentSlide <= 2) || 
                           (currentSlide >= 5 && currentSlide <= 6) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 0 || currentSlide === 1 || currentSlide === 6 || 
                    currentSlide === 2 || currentSlide === 5) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(0)}
              >
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: '#FFD700',
                  color: '#1a1a1a',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  opacity: currentSlide === 0 ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}>🔥 POPULAR</div>
                <img 
                  src="/assets/img/Useragent5.png"
                  alt="Real Estate Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Real Estate Agent 🏠
                </h3>

                {/* Button above text */}
                <button style={{
                  width: currentSlide === 0 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 0 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 0 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Qualifies leads, schedules property viewings, and answers questions about listings and neighborhoods.
                </p>
              </div>
      
              {/* Course Mentor Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 1 ? 'blur(0)' : 
                       (currentSlide === 0 || currentSlide === 2 ? 'blur(1px)' : 
                       (currentSlide === 6 || currentSlide === 3 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 1 ? 1 : 
                        (currentSlide === 0 || currentSlide === 2 ? 0.9 : 
                        (currentSlide === 6 || currentSlide === 3 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 1 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 6 || currentSlide <= 3) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 1 || currentSlide === 0 || currentSlide === 2 || 
                    currentSlide === 6 || currentSlide === 3) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(1)}
              >
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: '#FFD700',
                  color: '#1a1a1a',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  opacity: currentSlide === 1 ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}>🔥 POPULAR</div>
                <img 
                  src="/assets/img/UserAgent4.png"
                  alt="Course Mentor Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Course Mentor Agent 📅
                </h3>
                
                {/* Button above text */}
                <button style={{
                  width: currentSlide === 1 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 1 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 1 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Provides AI Mentor for your Online Course and provides 24/7 multilingual customer service.
                </p>
              </div>

              {/* Dropshipping Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 2 ? 'blur(0)' : 
                       (currentSlide === 1 || currentSlide === 3 ? 'blur(1px)' : 
                       (currentSlide === 0 || currentSlide === 4 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 2 ? 1 : 
                        (currentSlide === 1 || currentSlide === 3 ? 0.9 : 
                        (currentSlide === 0 || currentSlide === 4 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 2 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 0 && currentSlide <= 4) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 2 || currentSlide === 1 || currentSlide === 3 || 
                    currentSlide === 0 || currentSlide === 4) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(2)}
              >
                <img 
                  src="/assets/img/Useragent1.png"
                  alt="Dropshipping Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Dropshipping Agent 🛒
                </h3>
                
                {/* Button above text */}
                <button style={{
                  width: currentSlide === 2 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 2 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 2 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Automates Sales & Customer service via Instagram & Facebook DMs, with Phone Call Lead Qualification
                </p>
              </div>

              {/* Lifestyle Influencer Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 3 ? 'blur(0)' : 
                       (currentSlide === 2 || currentSlide === 4 ? 'blur(1px)' : 
                       (currentSlide === 1 || currentSlide === 5 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 3 ? 1 : 
                        (currentSlide === 2 || currentSlide === 4 ? 0.9 : 
                        (currentSlide === 1 || currentSlide === 5 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 3 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 1 && currentSlide <= 5) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 3 || currentSlide === 2 || currentSlide === 4 || 
                    currentSlide === 1 || currentSlide === 5) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(3)}
              >
                <img 
                  src="/assets/img/Useragent2.png"
                  alt="Lifestyle Influencer Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Lifestyle Influencer Agent 🌟
                </h3>
                
                {/* Button above text */}
                <button style={{
                  width: currentSlide === 3 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 3 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 3 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Manages social media presence across Instagram, Telegram & Discord. Automate engagement.
                </p>
              </div>

              {/* Theme Pages Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 4 ? 'blur(0)' : 
                       (currentSlide === 3 || currentSlide === 5 ? 'blur(1px)' : 
                       (currentSlide === 2 || currentSlide === 6 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 4 ? 1 : 
                        (currentSlide === 3 || currentSlide === 5 ? 0.9 : 
                        (currentSlide === 2 || currentSlide === 6 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 4 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 2 && currentSlide <= 6) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 4 || currentSlide === 3 || currentSlide === 5 || 
                    currentSlide === 2 || currentSlide === 6) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(4)}
              >
                <img 
                  src="/assets/img/Useragent3.png"
                  alt="Theme Pages Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Theme Pages Agent 🎨
                </h3>
                
                {/* Button above text */}
                <button style={{
                  width: currentSlide === 4 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 4 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 4 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Manages phone calls, processes bookings, and provides 24/7 multilingual customer service.
                </p>
              </div>

              {/* Custom Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 5 ? 'blur(0)' : 
                       (currentSlide === 4 || currentSlide === 6 ? 'blur(1px)' : 
                       (currentSlide === 3 || currentSlide === 0 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 5 ? 1 : 
                        (currentSlide === 4 || currentSlide === 6 ? 0.9 : 
                        (currentSlide === 3 || currentSlide === 0 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 5 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 3 && currentSlide <= 6) || currentSlide === 0 ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 5 || currentSlide === 4 || currentSlide === 6 || 
                    currentSlide === 3 || currentSlide === 0) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(5)}
              >
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: '#FFD700',
                  color: '#1a1a1a',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  opacity: currentSlide === 5 ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}>🔥 POPULAR</div>
                <img 
                  src="/assets/img/UserAgent6.png"
                  alt="Inspirational Coach Agent"
                  style={{
                    width: '220px',
                    height: '220px',
                    marginBottom: '25px',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Call Center Agent 📞
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  height: '70px',
                }}>
                  Build your own custom Call Center agent with features tailored to your business operations.
                </p>
                <button style={{
                  width: currentSlide === 5 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 5 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 5 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
              </div>
              
              {/* Inspirational Coach Agent */}
              <div style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '35px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                filter: currentSlide === 6 ? 'blur(0)' : 
                       (currentSlide === 5 || currentSlide === 0 ? 'blur(1px)' : 
                       (currentSlide === 4 || currentSlide === 1 ? 'blur(2px)' : 'blur(4px)')),
                opacity: currentSlide === 6 ? 1 : 
                        (currentSlide === 5 || currentSlide === 0 ? 0.9 : 
                        (currentSlide === 4 || currentSlide === 1 ? 0.7 : 0)),
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                border: currentSlide === 6 ? '2px solid #2937f0' : '2px solid transparent',
                visibility: (currentSlide >= 4 && currentSlide <= 6) || (currentSlide >= 0 && currentSlide <= 1) ? 'visible' : 'hidden',
              }}
              onMouseOver={(e) => {
                if (currentSlide === 6 || currentSlide === 5 || currentSlide === 0 || 
                    currentSlide === 4 || currentSlide === 1) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(41, 55, 240, 0.15)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              onClick={() => setCurrentSlide(6)}
              >
                <img
                    src="/assets/img/Useragent4.png"
                    alt="Custom Agent"
                    style={{
                      width: '220px',
                      height: '220px',
                      marginBottom: '25px',
                      objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '15px',
                }}>
                  Custom Agent 🛠️
                </h3>
                
                {/* Button above text */}
                <button style={{
                  width: currentSlide === 6 ? '180px' : '40px',
                  height: '40px',
                  borderRadius: currentSlide === 6 ? '20px' : '50%',
                  backgroundColor: '#2937f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gap: '8px',
                  marginBottom: '20px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/signup')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {currentSlide === 6 && <span style={{ color: 'white', fontWeight: 'bold' }}>Try This Agent</span>}
                </button>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5',
                  height: '70px',
                }}>
                  Build Your Own Custom Agent that represents the soul of your business model.
                </p>
              </div>
            </div>
          </div>

          {/* Slider Dots - Enhanced */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '40px',
          }}>
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <button
                key={index}
                style={{
                  width: currentSlide === index ? '30px' : '10px',
                  height: '10px',
                  borderRadius: '10px',
                  backgroundColor: currentSlide === index ? '#2937f0' : '#e0e0e0',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* SEO-friendly descriptive text and CTA */}
        <div style={{
          maxWidth: '800px',
          margin: '60px auto 0',
          textAlign: 'center',
        }}>
          {/* Button moved above text */}
          <button 
            onClick={() => navigate('/signup')}
            style={{
            backgroundColor: '#2937f0',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            padding: '15px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 15px rgba(41, 55, 240, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 auto 30px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(41, 55, 240, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(41, 55, 240, 0.2)';
          }}>
            <span>Create Your Custom Agent</span>
            <span style={{ fontSize: '24px' }}>⚡</span>
          </button>
          
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            Our intelligent AI agents are designed to transform your business operations across multiple industries. 
            From real estate to e-commerce, education to coaching, our versatile agents help you automate tasks, 
            engage customers, and boost conversions.
          </p>
        </div>
      </div>

      {/* AI Automation Tools Section - Playful Version */}
      <div style={{
        backgroundColor: 'white',
        width: '100%',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
        }}>
          {/* Colorful decorative elements */}
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(41,55,240,0.1), rgba(65,84,241,0.06))',
            top: '0px',
            left: '-50px',
            zIndex: 0,
          }}></div>
          
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(41,55,240,0.08), rgba(65,84,241,0.04))',
            bottom: '50px',
            right: '50px',
            zIndex: 0,
          }}></div>

          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '10px',
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ color: '#2937f0' }}>Super</span>charge Your Agents 🚀
          </h2>
          
          <p style={{
            fontSize: '22px',
            color: '#666',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 20px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            Unleash real-world powers with fun automation tools! ✨
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '40px',
          }}>
            
          </div>

          {/* Automation Cards Carousel */}
          <div style={{
            position: 'relative',
            maxWidth: '1200px',

            zIndex: 1,
          }}>
            {/* Left Navigation Button */}
            <button 
              style={{
                position: 'absolute',
                left: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid rgba(41,55,240,0.1)',
                boxShadow: '0 8px 16px rgba(41,55,240,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              onClick={() => {
                const carousel = document.getElementById('automationCarousel');
                if (carousel) {
                  carousel.scrollLeft -= 320;
                }
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(41,55,240,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(41,55,240,0.1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2937f0">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            {/* Right Navigation Button */}
            <button 
              style={{
                position: 'absolute',
                right: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid rgba(41,55,240,0.1)',
                boxShadow: '0 8px 16px rgba(41,55,240,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              onClick={() => {
                const carousel = document.getElementById('automationCarousel');
                if (carousel) {
                  carousel.scrollLeft += 320;
                }
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(41,55,240,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(41,55,240,0.1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2937f0">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>

            <div id="automationCarousel" style={{
              display: 'flex',
              gap: '25px',
              overflow: 'auto',
              scrollBehavior: 'smooth',
              padding: '20px 10px',
              margin: '0 -10px',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}>
              {/* Slack Notification Card */}
              <div style={{
                minWidth: '280px',
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid #F8F9FA',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(41, 55, 240, 0.1)';
                e.currentTarget.style.border = '2px solid #2937f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.border = '2px solid #F8F9FA';
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #e6e9ff 0%, #b1b8ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  fontSize: '40px',
                }}>
                  📅
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#212529',
                }}>
                  Calendar Booking
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#495057',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                }}>
                   Let your AI agent automatically book meetings for you! 
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(41,55,240,0.1)',
                    color: '#2937f0',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    make.com
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: '#868E96',
                  }}>
                    One-click setup
                  </span>
                </div>
              </div>
              
              {/* Email Magic Card */}
              <div style={{
                minWidth: '280px',
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid #F8F9FA',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(41, 55, 240, 0.1)';
                e.currentTarget.style.border = '2px solid #2937f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.border = '2px solid #F8F9FA';
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #d6dbff 0%, #99a3fc 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  fontSize: '40px',
                }}>
                  ✉️
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#212529',
                }}>
                  Email Magic
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#495057',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                }}>
                  Your AI sends perfect follow-ups while you sip coffee ☕
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(74,87,242,0.1)',
                    color: '#4a57f2',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    In App Integration
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: '#868E96',
                  }}>
                    Templates ready
                  </span>
                </div>
              </div>
              
              {/* CRM Wizard Card */}
              <div style={{
                minWidth: '280px',
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid #F8F9FA',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(41, 55, 240, 0.1)';
                e.currentTarget.style.border = '2px solid #2937f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.border = '2px solid #F8F9FA';
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #c4ccff 0%, #8792fa 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  fontSize: '40px',
                }}>
                  📸
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#212529',
                }}>
 Instagram Engagement
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#495057',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                }}>
                   Auto-reply to comments & stories while you focus on creating!
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(41,55,240,0.1)',
                    color: '#2937f0',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
In App Integration                  </span>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(74,87,242,0.1)',
                    color: '#4a57f2',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    One Click Setup
                  </span>
                </div>
              </div>
            </div>
            
            {/* Scroll controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '30px',
            }}>
             
            </div>
          </div>

          {/* Call to action */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px',
            position: 'relative',
            zIndex: 1,
          }}>
            <button style={{
              backgroundColor: '#2937f0',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '18px 36px',
              fontSize: '22px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(41, 55, 240, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(41, 55, 240, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(41, 55, 240, 0.3)';
            }}
            onClick={() => navigate('/signup')}>
              Explore All Automations 
              <span style={{ fontSize: '28px' }}>✨</span>
            </button>
          </div>
          
          {/* Features Icons with Animation */}
        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '60px auto 0',
          overflow: 'hidden',
          padding: '20px 0',
          background: 'linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 95%, white 100%)',
             }}>
              <div style={{
            display: 'flex',
            gap: '20px',
            transform: `translateX(${toolsPosition}%)`,
            transition: 'transform 0.1s linear',
            width: '200%',
              }}>
            {[...Array(2)].map((_, containerIndex) => (
              <div
                key={containerIndex}
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                {automationTools.map((item, index) => (
                  <div
                    key={`${containerIndex}-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 20px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ 
                      color: '#666',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                    }}>{item.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>  
        </div>
      </div>


      {/* Experience AI Voice Assistant Section */}
      <div id="experience-ai-voice" style={{
          padding: '80px 0',
          backgroundColor: '#f8f9fa',
          width: '100%',
          marginTop: '80px',
           }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              textAlign: 'center',
              marginBottom: '20px',
            }}>
              Experience AI Voice Assistant
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '50px',
              maxWidth: '800px',
              textAlign: 'center',
            }}>
              Get a free phone call from our AI agent and experience the future of communication firsthand
            </p>
            
            {/* Call Demo Form */}
            <div style={{
              maxWidth: '800px',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: isMobile ? '20px' : '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
              }}>
                {/* Name Field */}
                <div style={{ flex: '1', minWidth: isMobile ? '100%' : '300px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px 15px' : '15px 20px',
                      borderRadius: '10px',
                      border: '1px solid #e0e0e0',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2937f0'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                {/* Email Field */}
                <div style={{ flex: '1', minWidth: isMobile ? '100%' : '300px' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px 15px' : '15px 20px',
                      borderRadius: '10px',
                      border: '1px solid #e0e0e0',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2937f0'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>
              
              {/* Phone Field with Country Selection */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                marginBottom: '30px',
                gap: '10px',
              }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{
                    padding: isMobile ? '12px' : '15px',
                    borderRadius: '10px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: isMobile ? '100%' : '180px',
                    maxWidth: isMobile ? '100%' : '180px',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2937f0'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                >
                  <option value="+1">🇺🇸 US (+1)</option>
                  <option value="+44">🇬🇧 UK (+44)</option>
                  <option value="+1">🇨🇦 Canada (+1)</option>
                  <option value="+49">🇩🇪 Germany (+49)</option>
                  <option value="+33">🇫🇷 France (+33)</option>
                  <option value="+61">🇦🇺 Australia (+61)</option>
                  <option value="+81">🇯🇵 Japan (+81)</option>
                  <option value="+41">🇨🇭 Switzerland (+41)</option>
                  <option value="+39">🇮🇹 Italy (+39)</option>
                  <option value="+31">🇳🇱 Netherlands (+31)</option>
                  <option value="+46">🇸🇪 Sweden (+46)</option>
                  <option value="+47">🇳🇴 Norway (+47)</option>
                  <option value="+45">🇩🇰 Denmark (+45)</option>
                  <option value="+358">🇫🇮 Finland (+358)</option>
                  <option value="+65">🇸🇬 Singapore (+65)</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    flex: '1',
                    padding: '15px 20px',
                    borderRadius: '10px',
                    border: '1px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2937f0'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              
              {/* Submit Button */}
              <button 
                onClick={handleAICallRequest}
                disabled={isCallLoading}
                style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isCallLoading ? '#a0a8e8' : '#2937f0',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isCallLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onMouseOver={(e) => {
                if (!isCallLoading) e.currentTarget.style.backgroundColor = '#1e2ac0';
              }}
              onMouseOut={(e) => {
                if (!isCallLoading) e.currentTarget.style.backgroundColor = '#2937f0';
              }}>
                {isCallLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Launch AI Call
                  </>
                )}
              </button>
              
              {/* Status Message */}
              {callStatus && (
                <div style={{
                  marginTop: '15px',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  backgroundColor: callStatus.success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: callStatus.success ? '#4CAF50' : '#F44336',
                  fontSize: '14px',
                  textAlign: 'center',
                }}>
                  {callStatus.message}
                </div>
              )}
              
              {/* Terms Text */}
              <p style={{
                fontSize: '14px',
                color: '#999',
                textAlign: 'center',
                marginTop: '20px',
              }}>
                By clicking 'Launch AI Call', you agree to our terms and privacy policy.
                <br/>
                Your number will only be used for this demo call.
              </p>
            </div>
            
            {/* Highlighted Features Under the Form */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '30px',
              marginTop: '40px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(41, 55, 240, 0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2937f0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ color: '#666', fontSize: '16px' }}>Natural Voice Interactions</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(41, 55, 240, 0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2937f0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ color: '#666', fontSize: '16px' }}>Multilingual Support</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(41, 55, 240, 0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2937f0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ color: '#666', fontSize: '16px' }}>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>

      {/* Choose Your Tier Plan Section */}
      <div ref={pricingRef} style={{
        padding: '80px 20px',
        backgroundColor: 'white',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}>Choose your tier plan</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px',
              position: 'relative', // Add position relative for tooltip positioning
            }}>
              <a 
                href="#" 
                style={{
                  color: '#4361ee',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                }}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
                onClick={(e) => e.preventDefault()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#4361ee">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                What are credits?
              </a>
              {isTooltipVisible && (
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  right: '0',
                  width: '300px',
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  zIndex: 100,
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#333',
                  border: '1px solid #e9ecef',
                }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Credits Explained:</p>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    <li>Credits are the currency used for all AI interactions on our platform</li>
                    <li>1 credit = $0.006</li>
                    <li>1 message typically uses 1.5 credits</li>
                    <li>1 minute of AI phone calls uses 30 credits (≈ $0.18/minute)</li>
                    <li>Tool usage and advanced features consume additional credits</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Free Plan Card */}
          <div style={{
            marginBottom: '40px',
          }}>
            <div style={{
              backgroundColor: selectedPlan === 'free' ? '#f0f4ff' : '#fff',
              borderRadius: '16px',
              boxShadow: selectedPlan === 'free' ? '0 4px 20px rgba(67, 97, 238, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
              padding: '32px',
              border: selectedPlan === 'free' ? '2px solid #4361ee' : '2px solid transparent',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}>$0</h3>
                  <h4 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}>Free Plan</h4>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '16px',
                  }}>Perfect for testing and exploring our AI agents</p>
                </div>
                <div 
                  style={{
                    backgroundColor: selectedPlan === 'free' ? '#4361ee' : '#10b981',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    setSelectedPlan('free');
                    setBasePlanPrice(0);
                    setExtraCredits(0); // Reset extra credits when changing plans
                  }}
                >
                  {selectedPlan === 'free' ? 'Selected' : 'Get Started'}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '24px',
              }}>
                <div style={{
                  flex: '1',
                  minWidth: '200px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    500 Credits per month
                  </div>
                </div>
                <div style={{
                  flex: '1',
                  minWidth: '200px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    1 Agent
                  </div>
                </div>
                <div style={{
                  flex: '1',
                  minWidth: '200px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    All Channels Access
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px',
              }}>
                <button 
                  style={{
                    backgroundColor: selectedPlan === 'free' ? '#4361ee' : 'transparent',
                    color: selectedPlan === 'free' ? 'white' : '#4361ee',
                    border: '2px solid #4361ee',
                    borderRadius: '8px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    setSelectedPlan('free');
                    setBasePlanPrice(0);
                    setExtraCredits(0); // Reset extra credits when changing plans
                  }}
                  onMouseOver={(e) => {
                    if (selectedPlan !== 'free') {
                      e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedPlan !== 'free') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {selectedPlan === 'free' ? 'Selected' : 'Get Started Free'}
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers Row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {/* Silver Plan */}
            <div style={{
              flex: '1',
              minWidth: '300px',
              backgroundColor: selectedPlan === 'silver' ? '#f0f4ff' : '#fff',
              borderRadius: '16px',
              boxShadow: selectedPlan === 'silver' ? '0 4px 20px rgba(67, 97, 238, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
              padding: '32px',
              border: selectedPlan === 'silver' ? '2px solid #4361ee' : '2px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
            }}>
              <div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}>$29</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6c757d" style={{ marginRight: '8px' }}>
                    <path d="M12 7.29l-9 9 2.79 2.79 6.21-6.21 6.21 6.21 2.79-2.79-9-9z M12 2L0 14h4v8h6v-6h4v6h6v-8h4L12 2z"/>
                  </svg>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}>Silver</h4>
                </div>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                }}>For entrepreneurs and small businesses</p>
              </div>

              <div style={{ flex: '1' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px', marginTop: '4px', flexShrink: 0 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <div>5k Credits Monthly</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6c757d',
                      marginLeft: '30px',
                      marginTop: '4px',
                    }}>≈ 3,500 messages or 2.5h AI calls</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  5 Agents
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  1 Concurrent Call
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  2 Tools
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: selectedPlan === 'silver' ? '#4361ee' : 'transparent',
                  color: selectedPlan === 'silver' ? 'white' : '#4361ee',
                  border: '2px solid #4361ee',
                  borderRadius: '8px',
                  padding: '12px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setSelectedPlan('silver');
                  setBasePlanPrice(29);
                  setExtraCredits(0); // Reset extra credits when changing plans
                }}
                onMouseOver={(e) => {
                  if (selectedPlan !== 'silver') {
                    e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedPlan !== 'silver') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}>
                  {selectedPlan === 'silver' ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>

            {/* Gold Plan */}
            <div style={{
              flex: '1',
              minWidth: '300px',
              backgroundColor: selectedPlan === 'gold' ? '#f0f4ff' : '#f8f9fa',
              borderRadius: '16px',
              boxShadow: selectedPlan === 'gold' ? '0 4px 20px rgba(67, 97, 238, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
              padding: '32px',
              border: selectedPlan === 'gold' ? '2px solid #4361ee' : '2px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: '#4361ee',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}>
                Most Popular
              </div>

              <div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}>$99</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffc107" style={{ marginRight: '8px' }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}>Gold</h4>
                </div>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                }}>For growing teams and businesses</p>
              </div>

              <div style={{ flex: '1' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px', marginTop: '4px', flexShrink: 0 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <div>15k Credits Monthly</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6c757d',
                      marginLeft: '30px',
                      marginTop: '4px',
                    }}>≈ 10,000 messages or 8.5h AI calls</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  10 Agents
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Unlock 3 Templates
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  5 Tools
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Voice Agent
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: selectedPlan === 'gold' ? '#4361ee' : 'transparent',
                  color: selectedPlan === 'gold' ? 'white' : '#4361ee',
                  border: '2px solid #4361ee',
                  borderRadius: '8px',
                  padding: '12px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setSelectedPlan('gold');
                  setBasePlanPrice(99);
                  setExtraCredits(0); // Reset extra credits when changing plans
                }}
                onMouseOver={(e) => {
                  if (selectedPlan !== 'gold') {
                    e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedPlan !== 'gold') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}>
                  {selectedPlan === 'gold' ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>

            {/* Diamond Plan */}
            <div style={{
              flex: '1',
              minWidth: '300px',
              backgroundColor: selectedPlan === 'diamond' ? '#f0f4ff' : '#fff',
              borderRadius: '16px',
              boxShadow: selectedPlan === 'diamond' ? '0 4px 20px rgba(67, 97, 238, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
              padding: '32px',
              border: selectedPlan === 'diamond' ? '2px solid #4361ee' : '2px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
            }}>
              <div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}>$249</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0dcaf0" style={{ marginRight: '8px' }}>
                    <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2zm0 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"/>
                  </svg>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}>Diamond</h4>
                </div>
                <p style={{
                  color: '#6c757d',
                  marginBottom: '24px',
                }}>For large organizations and agencies</p>
              </div>

              <div style={{ flex: '1' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px', marginTop: '4px', flexShrink: 0 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <div>50k Credits Monthly</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6c757d',
                      marginLeft: '30px',
                      marginTop: '4px',
                    }}>≈ 40,000 messages or 25h AI calls</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  20 Agents
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Unlock 5 Templates
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  10 Tools
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Voice Agent
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4361ee" style={{ marginRight: '10px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  White Label
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: selectedPlan === 'diamond' ? '#4361ee' : 'transparent',
                  color: selectedPlan === 'diamond' ? 'white' : '#4361ee',
                  border: '2px solid #4361ee',
                  borderRadius: '8px',
                  padding: '12px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setSelectedPlan('diamond');
                  setBasePlanPrice(249);
                  setExtraCredits(0); // Reset extra credits when changing plans
                }}
                onMouseOver={(e) => {
                  if (selectedPlan !== 'diamond') {
                    e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedPlan !== 'diamond') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}>
                  {selectedPlan === 'diamond' ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          </div>

          {/* Credits Slider - Updated with blue dot and better styling */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '18px', fontWeight: '500' }}>Add extra credits</div>
              <div style={{ 
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#333',
              }}>
                Total: <span id="totalCost">${basePlanPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div style={{
              position: 'relative',
              marginBottom: '15px',
            }}>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                position: 'relative',
              }}>
                <div id="sliderTrack" style={{
                  position: 'absolute',
                  height: '100%',
                  width: '0%',
                  backgroundColor: '#4361ee',
                  borderRadius: '10px',
                  transition: 'width 0.2s',
                }}></div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000" 
                defaultValue="0"
                value={extraCredits}
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '-7px',
                  height: '20px',
                  opacity: 0,
                  cursor: 'pointer',
                }}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const percentage = (value / 100000) * 100;
                  const extraCreditsEl = document.getElementById('extraCredits');
                  const extraCostEl = document.getElementById('extraCost');
                  const totalCostEl = document.getElementById('totalCost');
                  const sliderThumb = document.getElementById('sliderThumb');
                  const sliderTrack = document.getElementById('sliderTrack');
                  
                  if (extraCreditsEl && extraCostEl && totalCostEl && sliderThumb && sliderTrack) {
                    const extraCost = (value * 0.006);
                    const total = (extraCost + basePlanPrice).toFixed(2);
                    
                    extraCreditsEl.textContent = `${value.toLocaleString()} extra credits`;
                    extraCostEl.textContent = `$${extraCost.toFixed(2)}`;
                    totalCostEl.textContent = `$${total}`;
                    
                    // Update slider visual
                    sliderThumb.style.left = `calc(${percentage}% - 8px)`;
                    sliderTrack.style.width = `${percentage}%`;
                  }
                  setExtraCredits(value);
                }}
              />
              <div id="sliderThumb" style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#4361ee',
                borderRadius: '50%',
                position: 'absolute',
                top: '-5px',
                left: '-8px',
                boxShadow: '0 0 0 4px rgba(67, 97, 238, 0.2)',
                cursor: 'pointer',
                transition: 'left 0.2s',
              }}></div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}>
              <span id="extraCredits" style={{ color: '#6c757d' }}>0 extra credits</span>
              <span id="extraCost" style={{ color: '#6c757d' }}>$0</span>
            </div>
          </div>

          {/* Note */}
          <div style={{
            marginTop: '60px',
            fontSize: '14px',
            color: '#6c757d',
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '60px auto 0',
          }}>
            <p>Note*: We are an AI agency specializing in both AI agent pre-made templates sales and enterprise Custom AI Agents creation. Our business model is simple: Create a free account and pay as you consume. 1 credit = 0.006$, 30 credits per AI phone call minute (≈ $0.18/minute or $10/hour). 1 message = 1.5 credits (including tool usage and UI engine).</p>
          </div>
        </div>
      </div>


        {/* Capabilities Section */}
        <section ref={capabilitiesRef} id="capabilities" style={{
  padding: '80px 20px',
  backgroundColor: 'white',
 }}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  }}>
    <h2 style={{
      fontSize: '42px',
      fontWeight: 'bold',
      color: '#1a1a1a',
      textAlign: 'center',
      marginBottom: '20px',
    }}>
      Capabilities
    </h2>
    <p style={{
      fontSize: '18px',
      color: '#666',
      marginBottom: '50px',
      maxWidth: '800px',
      textAlign: 'center',
      margin: '0 auto 50px',
    }}>
      Discover the powerful features that make our AI agents versatile and effective
    </p>

    {/* Capabilities Cards */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
    }}>
      {/* Omni-channel Chat Card */}
      <div style={{
        width: '350px',
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/capabilities/omni-chat'}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}>
          <img 
            src="/assets/img/omnichannel.png" 
            alt="Omni-channel Chat" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div style={{
          padding: '25px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f0f2ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2937f0">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: 0,
            }}>
              Omni-channel Chat
            </h3>
          </div>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}>
            Centralize all your multi-channel messages in one place. Seamlessly engage in sales, marketing, or service through multiple platforms.
          </p>
          <button style={{
            backgroundColor: 'transparent',
            color: '#2937f0',
            border: '1px solid #2937f0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2937f0';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2937f0';
          }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Phone Calls Card */}
      <div style={{
        width: '350px',
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/capabilities/phone-calls'}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}>
          <img 
            src="/assets/img/phone.png" 
            alt="Phone Calls" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div style={{
          padding: '25px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f0f2ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2937f0">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: 0,
            }}>
              Phone Calls
            </h3>
          </div>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}>
            Transform your business communication with AI-powered phone support. Our agents handle customer calls 24/7, qualify leads, and schedule appointments.
          </p>
          <button style={{
            backgroundColor: 'transparent',
            color: '#2937f0',
            border: '1px solid #2937f0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2937f0';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2937f0';
          }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Tools Card */}
      <div style={{
        width: '350px',
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/capabilities/tools'}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}>
          <img 
            src="/assets/img/tools.jpg" 
            alt="Tools" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div style={{
          padding: '25px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f0f2ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2937f0">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: 0,
            }}>
              Tools
            </h3>
          </div>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}>
            Seamlessly integrate with your favorite business tools. Connect with Shopify, Instagram, WhatsApp, Discord, and more to streamline operations.
          </p>
          <button style={{
            backgroundColor: 'transparent',
            color: '#2937f0',
            border: '1px solid #2937f0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2937f0';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2937f0';
          }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* AI Agent Features Section */}
      <div ref={featuresRef} style={{
        padding: '80px 20px',
        backgroundColor: '#f8f9fa',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}>
            {/* Left side - AI Agent Image */}
            <div style={{
              flex: '0.8',
              minWidth: '300px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'flex-start',
            }}>
              <div style={{
                width: '380px',
                height: '380px',
                backgroundColor: '#5e48e8',
                borderRadius: '50%',
                position: 'relative',
                marginLeft: '0',
              }}>
                <img 
                  src="/assets/img/Useragent3.jpg"
                  alt="AI Agent"
                  style={{
                    position: 'absolute',
                    height: '115%',
                    width: 'auto',
                    left: '50%',
                    bottom: '0',
                    transform: 'translateX(-50%)',
                    objectFit: 'contain',
                    animation: 'float 3s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
            
            {/* Right side - Features Grid */}
            <div style={{
              flex: '1.2',
              minWidth: '350px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}>
              {/* AI Agent Creation */}
              <div style={{
                padding: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(94, 72, 232, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 2h5v2h-5V6zm0 3h5v2h-5V9zm0 3h5v2h-5v-2zM6 6h2v2H6V6zm0 3h2v2H6V9zm0 3h2v2H6v-2zm0 3h12v2H6v-2z" fill="#5e48e8"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#333',
                }}>
                  AI Agent Creation
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Design AI agents tailored to your specific business requirements with ease.
                </p>
              </div>
              
              {/* Effortless Deployment */}
              <div style={{
                padding: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(94, 72, 232, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41-4.6 4.6z" fill="#5e48e8"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#333',
                }}>
                  Effortless Deployment
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Deploy your AI agents quickly and efficiently with minimal effort.
                </p>
              </div>
              
              {/* Cost-Effective */}
              <div style={{
                padding: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(94, 72, 232, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM5 5h2v2H5V5zm0 3h2v2H5V8zm0 3h2v2H5v-2zm0 3h12v2H5v-2z" fill="#5e48e8"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#333',
                }}>
                  Cost-Effective
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Our platform offers competitive pricing to maximize your ROI.
                </p>
              </div>
              
              {/* Secure and Reliable */}
              <div style={{
                padding: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(94, 72, 232, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#5e48e8"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#333',
                }}>
                  Secure and Reliable
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Built with security and reliability at its core, ensuring peace of mind.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action Button */}
          <div style={{
            marginTop: '50px',
            textAlign: 'center',
          }}>
           
          </div>
        </div>
      </div>



     {/* Our Process Section */}
       <section style={{
        padding: '80px 0',
        backgroundColor: '#f8f9fa',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '50px',
          }}>
            Our Process
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '60px',
            maxWidth: '800px',
            textAlign: 'center',
            margin: '0 auto 60px',
          }}>
            Experience our streamlined approach to AI implementation
          </p>

          {/* Process Steps */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
          }}>
            {/* Step 1 - Create */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: '#4361ee',
                    marginRight: '20px',
                    opacity: 0.8,
                  }}>
                    01
                  </div>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                  }}>
                    Create an Agent
                  </h3>
                </div>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Create and customize an agent for yourself or your client. Whether you're designing a Voice agent on Vapi or Text agent, we got you covered.
                </p>
              </div>
              <div style={{ 
                flex: 1, 
                minWidth: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}>
                <video 
                  width="100%" 
                  controls
                  style={{ display: 'block' }}
                >
                  <source src="\assets\img\Create.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Step 2 - Deploy */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              flexDirection: 'row-reverse',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: '#4361ee',
                    marginRight: '20px',
                    opacity: 0.8,
                  }}>
                    02
                  </div>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                  }}>
                    Deploy
                  </h3>
                </div>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Launch your AI agent across multiple platforms with just a few clicks. Seamlessly integrate with your existing systems.
                </p>
              </div>
              <div style={{ 
                flex: 1, 
                minWidth: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}>
                <video 
                  width="100%" 
                  controls
                  style={{ display: 'block' }}
                >
                  <source src="assets/img/deploy.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Step 3 - Monitor */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: '#4361ee',
                    marginRight: '20px',
                    opacity: 0.8,
                  }}>
                    03
                  </div>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                  }}>
                    Monitor Results
                  </h3>
                </div>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  Track your AI agent's performance in real-time. Get insights into user interactions, response times, and success rates to optimize your automation.
                </p>
              </div>
              <div style={{ 
                flex: 1, 
                minWidth: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}>
                <video 
                  width="100%" 
                  controls
                  style={{ display: 'block' }}
                >
                  <source src="assets/img//Mointer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side Social Media Icons */}
      <div style={{ 
        position: 'fixed', 
        right: '20px', 
        top: '50%', 
        transform: 'translateY(-50%)',
        display: isMobile ? 'none' : 'flex', // Hide on mobile
        flexDirection: 'column',
        gap: '15px',
        zIndex: 3,
      }}>
        <a href="https://www.facebook.com/messages/t/404086879465427" target="_blank" rel="noopener noreferrer" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#4267B2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0, 85, 255, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(14, 92, 248, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 103, 178, 0.5)';
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: '28px', height: '28px' }} />
        </a>
        <a href="https://www.instagram.com/direct/t/17849319509771278" target="_blank" rel="noopener noreferrer" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(214, 36, 159, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(214, 36, 159, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(214, 36, 159, 0.5)';
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style={{ width: '28px', height: '28px' }} />
        </a>
        <a href="https://discord.gg/2aHEJ4UV" target="_blank" rel="noopener noreferrer" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#5865F2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(88, 101, 242, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(88, 101, 242, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 101, 242, 0.5)';
        }}>
          <svg width="28" height="28" viewBox="0 0 127.14 96.36" fill="#FFFFFF"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
        </a>

        {/* WhatsApp bubble */}
        <a href="#" onClick={(e) => {
          e.preventDefault();
          // Create modal for j.jpg
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
          modal.style.display = 'flex';
          modal.style.justifyContent = 'center';
          modal.style.alignItems = 'center';
          modal.style.zIndex = '1000';
          
          // Create card container
          const card = document.createElement('div');
          card.style.backgroundColor = 'white';
          card.style.borderRadius = '15px';
          card.style.padding = '20px';
          card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
          card.style.maxWidth = '80%';
          card.style.position = 'relative';
          
          // Create image
          const img = document.createElement('img');
          img.src = 'assets/img/j.jpg';
          img.alt = 'J';
          img.style.maxWidth = '100%';
          img.style.maxHeight = '70vh';
          img.style.borderRadius = '10px';
          img.style.display = 'block';
          
          // Create close button
          const closeBtn = document.createElement('button');
          closeBtn.innerHTML = '&times;';
          closeBtn.style.position = 'absolute';
          closeBtn.style.top = '10px';
          closeBtn.style.right = '10px';
          closeBtn.style.width = '30px';
          closeBtn.style.height = '30px';
          closeBtn.style.borderRadius = '50%';
          closeBtn.style.backgroundColor = '#f0f0f0';
          closeBtn.style.border = 'none';
          closeBtn.style.fontSize = '20px';
          closeBtn.style.fontWeight = 'bold';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.display = 'flex';
          closeBtn.style.justifyContent = 'center';
          closeBtn.style.alignItems = 'center';
          closeBtn.style.color = '#333';
          closeBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
          
          // Add event listeners
          closeBtn.onclick = () => document.body.removeChild(modal);
          modal.onclick = (event) => {
            if (event.target === modal) {
              document.body.removeChild(modal);
            }
          };
          
          // Append elements
          card.appendChild(img);
          card.appendChild(closeBtn);
          modal.appendChild(card);
          document.body.appendChild(modal);
        }} style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#25D366',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 211, 102, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.5)';
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '28px', height: '28px' }} />
        </a>
        
        <a href="https://solutions.tixaeagents.ai/eu/prototype/tTKtg6VdMS9UKvKg2WtU" target="_blank" rel="noopener noreferrer" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#2196F3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(33, 150, 243, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(33, 150, 243, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.5)';
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5H4.847zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
          </svg>
        </a>
        
        {/* Phone bubble - now placed before email */}
        <a href="#" onClick={() => scrollToSection(document.getElementById('experience-ai-voice') ? { current: document.getElementById('experience-ai-voice') } : null)} style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#00ff0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(34, 255, 71, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(34, 255, 71, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 255, 71, 0.5)';
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
          </svg>
        </a>
        
        {/* Email bubble - now after phone */}
        <a href="mailto:info@aiagent.com" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#E91E63',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(233, 30, 99, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(233, 30, 99, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(233, 30, 99, 0.5)';
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
          </svg>
        </a>
        
        {/* Telegram bubble */}
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#0088cc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0, 136, 204, 0.5)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 136, 204, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 136, 204, 0.5)';
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
          </svg>
        </a>
      </div>

      {/* Customer Success Stories Section */}
      <div ref={successStoriesRef} id="success-stories" style={{
        padding: '80px 0',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1a1a1a',
          position: 'relative',
        }}>
          <span style={{ position: 'relative', zIndex: 2 }}>Success Stories</span>
          <span style={{ 
            position: 'absolute', 
            left: '50%', 
            bottom: '0px', 
            transform: 'translateX(-50%)',
            width: '180px', 
            height: '15px', 
            backgroundColor: 'rgba(41, 55, 240, 0.2)', 
            zIndex: 1,
            borderRadius: '10px',
          }}></span>
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '50px',
          maxWidth: '800px',
          margin: '0 auto 30px',
        }}>
          See how businesses achieve remarkable results with our AI agents
        </p>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          overflow: 'hidden',
          padding: '40px 0',
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            transition: 'transform 0.5s ease',
            height: '380px',
          }}>
            {/* Reviews array */}
            {[
              {
                name: "Michael Chen",
                role: "Marketing Director",
                company: "StyleTrend",
                platform: "Instagram",
                review: "Our Instagram engagement rate jumped by 215% after implementing the GoAgent. It handles comments and DMs exactly like our brand voice, 24/7.",
                profileImg: "user2.png"
              },
              {
                name: "Emma Rodriguez",
                role: "Community Manager",
                company: "Gamer Connect",
                platform: "Discord",
                review: "Our Discord community grew from 8k to 25k members in just 3 months with the AI moderator.It keeps conversations active around the clock.",
                profileImg: "sophia.jpg"
              },
              {
                name: "Mia Johnson",
                role: "Restaurant Owner",
                company: "Bistro Nouveau",
                platform: "Phone",
                review: "The phone agent handles over 200 calls daily, booking tables and answering questions. We've increased reservations by 40%.",
                profileImg: "user3.jpg"
              },
              {
                name: "Sarah Williams",
                role: "Customer Service Lead",
                company: "TechGadgets",
                platform: "WhatsApp",
                review: "Our WhatsApp support agent responds within seconds instead of hours. we're handling 3x more inquiries with the same team size.",
                profileImg: "user4.jpg"
              },
              {
                name: "Sophia Davis",
                role: "Real Estate Agent",
                company: "Prime Properties",
                platform: "Facebook",
                review: "The Facebook lead qualification agent screens potential buyers 24/7 and books showings directly to my calendar. My conversion rate increased by 82%.",
                profileImg: "user1.jpg"
              }
            ].map((review, index) => {
              // Calculate position based on currentSuccessStorySlide
              // Center the current slide (0), put previous at -2, next at +2
              // This positions the cards properly for the visual effect
              let position;
              if (index === currentSuccessStorySlide) {
                position = 0; // Center card
              } else if (index === (currentSuccessStorySlide + 1) % 5) {
                position = 1; // Right of center
              } else if (index === (currentSuccessStorySlide + 4) % 5) {
                position = -1; // Left of center
              } else if (index === (currentSuccessStorySlide + 2) % 5) {
                position = 2; // Far right
              } else {
                position = -2; // Far left
              }
              
              // Set styling based on position
              let cardStyle = {
                opacity: 1,
                filter: 'blur(0px)',
                transform: 'scale(1.2)',
                zIndex: 5,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              };
              
              if (Math.abs(position) === 1) {
                // Cards to the immediate left and right - keep them focused too
                cardStyle = {
                  opacity: 0.9,
                  filter: 'blur(0px)',
                  transform: 'scale(0.9)',
                  zIndex: 4,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                };
              } else if (Math.abs(position) === 2) {
                // Far left and far right cards - keep these blurred
                cardStyle = {
                  opacity: 0.4,
                  filter: 'blur(3px)',
                  transform: 'scale(0.7)',
                  zIndex: 1,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                };
              }
              
              return (
                <div 
                  key={index}
            style={{
                    width: '350px',
                    height: '320px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '30px',
              position: 'absolute',
                    left: `calc(50% + ${position * 320}px - 175px)`,
                    transition: 'all 0.5s ease',
                    opacity: cardStyle.opacity,
                    filter: cardStyle.filter,
                    transform: cardStyle.transform,
                    zIndex: cardStyle.zIndex,
                    boxShadow: cardStyle.boxShadow
                  }}
                >
          <div style={{
            display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      marginRight: '15px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={`/assets/img/${review.profileImg}`}
                        alt={review.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ 
                        margin: '0', 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {review.name}
                      </h3>
                      <p style={{ 
                        margin: '2px 0 0', 
                        fontSize: '14px', 
                        color: '#666' 
                      }}>
                        {review.role}, {review.company}
                      </p>
              </div>
            </div>

            <div style={{
                    display: 'inline-block',
                    backgroundColor: '#f0f4ff',
                    color: '#2937f0',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    marginBottom: '15px'
                  }}>
                    {review.platform} Agent
                </div>
                  
                  <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    color: '#444',
                    textAlign: 'left',
                    flex: 1,
                    marginBottom: '20px',
                    height: '115px',
                    overflow: 'hidden'
                  }}>
                    "{review.review}"
                  </p>
                  
            <div style={{
              display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f0f0f0',
                  }}>
                <div>
                      <span style={{ color: '#FFD700' }}>★★★★★</span>
                </div>
            <div style={{
              display: 'flex',
                      alignItems: 'center',
                      color: '#2937f0',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}>
                      {position === 0 && (
                        <span>Verified Customer</span>
                      )}
                </div>
              </div>
              </div>
              );
            })}
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={() => handleSuccessStoriesSlide('left')}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#2937f0">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button 
            onClick={() => handleSuccessStoriesSlide('right')}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#2937f0">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          
          {/* Indicator dots - exactly 5 for the 5 testimonials */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px',
          }}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                onClick={() => {
                  setCurrentSuccessStorySlide(index);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                style={{
                  width: index === currentSuccessStorySlide ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: index === currentSuccessStorySlide ? '#2937f0' : '#d0d0d0',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>


    
       



      {/* Footer Section */}
      <footer style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        padding: '60px 0 30px',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '0 30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '40px',
        }}>
          {/* Logo and Description */}
          <div style={{
            flex: '1.2',
            minWidth: '280px',
            marginBottom: '40px',
            paddingRight: '50px',
          }}>
            <img 
              src="/assets/img/images.png" 
              alt="AI Agent Platform Logo" 
              style={{ 
                height: '70px', 
                marginBottom: '20px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '25px',
            }}>
              Deploy intelligence across multiple platforms to maximize your profits. Create, deploy, and manage AI agents effortlessly. ✨
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
            }}>
              
            </div>
          </div>

          {/* Main Pages */}
          <div style={{
            flex: '1',
            minWidth: '200px',
            marginBottom: '40px',
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: '#333',
            }}>Main Pages</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Product</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Capabilities</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Agent Templates</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Pricing</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Features</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>AI Models</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div style={{
            flex: '1',
            minWidth: '280px',
            marginBottom: '30px',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}>Stay Updated</h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '15px',
            }}>
              Subscribe to our newsletter for the latest features and updates.
            </p>
            {subscriptionSuccess ? (
              <div style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '12px 15px',
                borderRadius: '5px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                You've been successfully subscribed!
              </div>
            ) : (
              <>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                    fontSize: '14px',
                  }}
                />
                <button 
                  onClick={(e) => handleNewsletterSubscription(e)}
                  disabled={isSubscribing}
                  style={{
                    backgroundColor: isSubscribing ? '#a0a8e8' : '#2937f0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                  <span style={{ display: 'inline-block', marginRight: '5px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </span>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Copyright and Links */}
        <div style={{
          borderTop: '1px solid #eee',
          paddingTop: '20px',
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#999',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>© AI Agent Platform 2024. All Rights Reserved.</div>
          <div style={{
            display: 'flex',
            gap: '20px',
            margin: '10px 0',
          }}>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Help Center</a>
          </div>
        </div>
      </footer>

     
    </div>
  );
};

export default Home;
