import React from 'react';
import { Link } from 'react-router-dom';
import './CapabilityPage.css';

const OmniChatPage = () => {
  return (
    <div className="omni-page">
      {/* Minimal Header */}
      <header className="modern-header">
        <div className="logo">
          <Link to="/">
            <img src="/assets/img/logo.png" alt="Go Agents Logo" />
          </Link>
        </div>
        <div className="header-actions">
          <Link to="https://solutions.tixaeagents.ai/app/eu" className="header-link">Sign In</Link>
          <Link to="/signup" className="primary-button">Get Started</Link>
        </div>
      </header>

      {/* Hero Section with Large Image */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Unify All Your Customer Conversations</h1>
          <p>One platform for all your messaging channels. Respond faster, collaborate better, satisfy customers.</p>
          <div className="hero-buttons">
            <Link to="https://solutions.tixaeagents.ai/eu/prototype/tTKtg6VdMS9UKvKg2WtU" className="primary-button">Book Demo</Link>
            <Link to="/" className="outline-button">View Pricing</Link>
          </div>
          
          {/* Platform Icons */}
          
        </div>
        <div className="hero-visual">
          <img 
            src="/assets/img/omnichannel.png" 
            alt="Omni-channel Dashboard" 
            className="dashboard-preview" 
          />
        </div>
      </section>
  {/* Benefits Section - Redesigned */}
  <section className="benefits-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Transform Your Customer Communications</h2>
            <p>Bring all your customer conversations into one intuitive platform designed for efficiency and exceptional service.</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 8H22" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Unified Inbox</h3>
              <p>Manage all customer messages across WhatsApp, Messenger, Instagram, and more from one interface.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20V10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 20V4" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 20V16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Real-Time Analytics</h3>
              <p>Get instant insights into response times, customer satisfaction, and agent performance.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>AI-Powered Assistance</h3>
              <p>Our AI suggests responses and automates routine inquiries so your team can focus on complex issues.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3.12598C17.7252 3.56984 19 5.13618 19 6.99998C19 8.86378 17.7252 10.4301 16 10.874" stroke="#4754F0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Team Collaboration</h3>
              <p>Seamlessly collaborate with your team on customer inquiries with internal notes and assignments.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Large Omnich Image Section - Featured More Prominently */}
      <section className="full-width-image-section">
        <div className="image-container">
          <img 
            src="/assets/img/omnich.jpg" 
            alt="Omnichannel Communication Platform" 
            className="feature-image"
          />
        </div>
      </section>

    

      {/* How It Works - Reimagined */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Simplify Your Customer Service</h2>
            <p>A streamlined process that connects all your messaging channels in four easy steps</p>
          </div>
          
          <div className="workflow-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Connect Your Channels</h3>
                <p>Integrate WhatsApp, Facebook Messenger, Instagram, and more with just a few clicks.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Customize Your Workflow</h3>
                <p>Set up routing rules, automated responses, and team assignments based on your needs.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Engage Customers</h3>
                <p>Respond to all messages from a single interface with AI-powered suggestions.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Optimize with Analytics</h3>
                <p>Continuously improve your service with real-time performance insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="section-container">
          <div className="results-content">
            <div className="results-text">
              <span className="results-label">PROVEN RESULTS</span>
              <h2>Businesses See Real Improvements</h2>
              <p>Our customers experience measurable gains in efficiency, customer satisfaction, and team productivity after implementing our omni-channel solution.</p>
              
              <div className="testimonial">
                <p className="quote">"After implementing Go Agents' Omni-channel Chat solution, we reduced response times by 64% and our team now handles twice as many inquiries without feeling overwhelmed."</p>
                <div className="testimonial-author">
                  <img src="/assets/img/user4.jpg" alt="Sarah Johnson" />
                  <div>
                    <p className="author-name">Sarah Johnson</p>
                    <p className="author-title">Customer Support Director, TechGrowth Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="results-stats">
              <div className="stat-box">
                <h3>64%</h3>
                <p>Faster response times</p>
              </div>
              <div className="stat-box">
                <h3>42%</h3>
                <p>Higher satisfaction scores</p>
              </div>
              <div className="stat-box">
                <h3>2x</h3>
                <p>More inquiries handled</p>
              </div>
              <div className="stat-box">
                <h3>30%</h3>
                <p>Lower support costs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kept CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Streamline Your Customer Communications?</h2>
          <p>Join thousands of businesses providing seamless customer experiences across all messaging channels.</p>
          <Link to="/signup" className="primary-button large">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default OmniChatPage; 