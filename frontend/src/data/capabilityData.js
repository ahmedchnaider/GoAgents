// Common SVG icons (as strings) for benefits
const icons = {
  chat: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H22" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
  </svg>`,
  
  analytics: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20V10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 20V4" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 20V16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
  </svg>`,
  
  ai: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,
  
  team: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3.12598C17.7252 3.56984 19 5.13618 19 6.99998C19 8.86378 17.7252 10.4301 16 10.874" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
  </svg>`,

  phone: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  recording: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 20.01L2.01 19.999M6 20.01L6.01 19.999M10 20.01L10.01 19.999M14 20.01L14.01 19.999M18 20.01L18.01 19.999M22 20.01L22.01 19.999" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  integration: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  workflow: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  biDirectional: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4393 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60706C11.7642 9.26329 11.0684 9.05886 10.3533 9.00764C9.63816 8.95641 8.92037 9.05951 8.24861 9.31006C7.57685 9.56061 6.96684 9.95286 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  template: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11H21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 21H13" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15H10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 15H15" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`
};

// Data for each capability page
export const omniChatData = {
  title: "Unify All Your Customer Conversations",
  description: "One platform for all your messaging channels. Respond faster, collaborate better, satisfy customers.",
  heroImage: "/assets/img/omnichannel.png",
  featureImage: "/assets/img/omnich.jpg",
  
  benefits: {
    title: "Transform Your Customer Communications",
    description: "Bring all your customer conversations into one intuitive platform designed for efficiency and exceptional service.",
    items: [
      {
        icon: icons.chat,
        title: "Unified Inbox",
        description: "Manage all customer messages across WhatsApp, Messenger, Instagram, and more from one interface."
      },
      {
        icon: icons.analytics,
        title: "Real-Time Analytics",
        description: "Get instant insights into response times, customer satisfaction, and agent performance."
      },
      {
        icon: icons.ai,
        title: "AI-Powered Assistance",
        description: "Our AI suggests responses and automates routine inquiries so your team can focus on complex issues."
      },
      {
        icon: icons.team,
        title: "Team Collaboration",
        description: "Seamlessly collaborate with your team on customer inquiries with internal notes and assignments."
      }
    ]
  },
  
  workflow: {
    title: "Simplify Your Customer Service",
    description: "A streamlined process that connects all your messaging channels in four easy steps",
    steps: [
      {
        title: "Connect Your Channels",
        description: "Integrate WhatsApp, Facebook Messenger, Instagram, and more with just a few clicks."
      },
      {
        title: "Customize Your Workflow",
        description: "Set up routing rules, automated responses, and team assignments based on your needs."
      },
      {
        title: "Engage Customers",
        description: "Respond to all messages from a single interface with AI-powered suggestions."
      },
      {
        title: "Optimize with Analytics",
        description: "Continuously improve your service with real-time performance insights."
      }
    ]
  },
  
  testimonial: {
    label: "PROVEN RESULTS",
    title: "Businesses See Real Improvements",
    description: "Our customers experience measurable gains in efficiency, customer satisfaction, and team productivity after implementing our omni-channel solution.",
    quote: "After implementing Go Agents' Omni-channel Chat solution, we reduced response times by 64% and our team now handles twice as many inquiries without feeling overwhelmed.",
    authorImage: "/assets/img/user4.jpg",
    authorName: "Sarah Johnson",
    authorTitle: "Customer Support Director, TechGrowth Inc."
  },
  
  stats: [
    { value: "64%", label: "Faster response times" },
    { value: "42%", label: "Higher satisfaction scores" },
    { value: "2x", label: "More inquiries handled" },
    { value: "30%", label: "Lower support costs" }
  ],
  
  ctaTitle: "Ready to Streamline Your Customer Communications?",
  ctaDescription: "Join thousands of businesses providing seamless customer experiences across all messaging channels."
};

export const phoneCallsData = {
  title: "Seamless Voice Calling Integration",
  description: "Transform your business communications with AI-enhanced phone calls. Handle customer calls more efficiently than ever before.",
  heroImage: "/assets/img/phone-calls.png",
  featureImage: "/assets/img/phone-system.jpg",
  
  benefits: {
    title: "Enhance Your Voice Communications",
    description: "Our phone calling solution brings AI-powered features to your voice conversations, improving quality and efficiency.",
    items: [
      {
        icon: icons.phone,
        title: "Smart Call Routing",
        description: "Direct calls to the right team members based on availability, expertise, and customer history."
      },
      {
        icon: icons.recording,
        title: "Call Recording & Transcription",
        description: "Automatically record calls and convert them to searchable text for training and reference."
      },
      {
        icon: icons.ai,
        title: "Real-time AI Assistance",
        description: "Get live suggestions and information during calls to provide faster, more accurate responses."
      },
      {
        icon: icons.team,
        title: "Call Queue Management",
        description: "Efficiently manage high call volumes with smart queuing, callback options, and wait time estimates."
      }
    ]
  },
  
  workflow: {
    title: "How Our Phone Call System Works",
    description: "A comprehensive phone solution that integrates with your existing systems",
    steps: [
      {
        title: "Set Up Your Phone System",
        description: "Quickly configure your phone numbers, IVR menus, and call routing preferences."
      },
      {
        title: "Connect With Your Team",
        description: "Add agents and configure their availability, skills, and call handling preferences."
      },
      {
        title: "Enable AI Features",
        description: "Activate call recording, transcription, sentiment analysis, and AI-powered call summaries."
      },
      {
        title: "Analyze & Optimize",
        description: "Review call metrics and use AI-generated insights to improve customer interactions."
      }
    ]
  },
  
  testimonial: {
    label: "SUCCESS STORY",
    title: "How VoiceConnect Transformed Their Call Center",
    description: "Our phone solution helped VoiceConnect improve customer satisfaction while reducing operational costs.",
    quote: "Since implementing Go Agents' phone system, our call resolution times decreased by 35% and our CSAT scores improved dramatically. The AI call assistants have been a game-changer for our agents.",
    authorImage: "/assets/img/user3.jpg",
    authorName: "Michael Roberts",
    authorTitle: "Call Center Manager, VoiceConnect"
  },
  
  stats: [
    { value: "35%", label: "Faster call resolution" },
    { value: "28%", label: "Increase in CSAT scores" },
    { value: "40%", label: "Reduction in call transfers" },
    { value: "23%", label: "Decrease in operating costs" }
  ],
  
  ctaTitle: "Ready to Transform Your Phone Communications?",
  ctaDescription: "Join hundreds of businesses enhancing their customer call experience with AI-powered tools."
};

export const toolsData = {
  title: "Automation Using Zapier & Make",
  description: "Connect your favorite tools and automate workflows with our powerful integration platform. No coding required.",
  heroImage: "/assets/img/automation-tools.png",
  featureImage: "/assets/img/zapier-make.jpg",
  
  benefits: {
    title: "Seamlessly Integrate Your Business Tools",
    description: "Connect with 3,000+ apps and create automated workflows that save time and reduce errors.",
    items: [
      {
        icon: icons.integration,
        title: "Native Integrations",
        description: "Connect with Zapier, Make (formerly Integromat), and thousands of other popular business applications."
      },
      {
        icon: icons.workflow,
        title: "Visual Workflow Builder",
        description: "Create complex automations with our intuitive drag-and-drop interface. No coding knowledge required."
      },
      {
        icon: icons.biDirectional,
        title: "Bi-directional Data Flow",
        description: "Sync data between applications in real-time, ensuring your systems are always up to date."
      },
      {
        icon: icons.template,
        title: "Pre-built Templates",
        description: "Get started quickly with pre-configured automation templates for common business scenarios."
      }
    ]
  },
  
  workflow: {
    title: "Create Powerful Automations in Minutes",
    description: "Our platform makes it easy to connect your tools and automate repetitive tasks",
    steps: [
      {
        title: "Connect Your Apps",
        description: "Easily integrate with Zapier, Make, and thousands of business applications."
      },
      {
        title: "Define Triggers & Actions",
        description: "Specify what events should trigger your automation and what actions should follow."
      },
      {
        title: "Map Your Data",
        description: "Define how information should flow between your applications with our simple mapping tools."
      },
      {
        title: "Test & Launch",
        description: "Test your automation with real data, then activate it to start saving time immediately."
      }
    ]
  },
  
  testimonial: {
    label: "CUSTOMER SPOTLIGHT",
    title: "How DataSync Streamlined Their Operations",
    description: "See how DataSync used our integration platform to automate their workflows and improve productivity.",
    quote: "By connecting our CRM, project management, and invoicing systems with Go Agents' integration platform, we've automated over 15 workflows that used to require manual entry. Our team is saving 20+ hours per week.",
    authorImage: "/assets/img/user2.jpg",
    authorName: "Jennifer Chen",
    authorTitle: "Operations Director, DataSync Solutions"
  },
  
  stats: [
    { value: "20+", label: "Hours saved per week" },
    { value: "98%", label: "Reduction in data errors" },
    { value: "15", label: "Workflows automated" },
    { value: "3x", label: "Faster customer onboarding" }
  ],
  
  ctaTitle: "Ready to Automate Your Business Processes?",
  ctaDescription: "Join thousands of companies using our platform to connect their tools and streamline their workflows."
}; 