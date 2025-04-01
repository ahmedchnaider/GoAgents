import React from 'react';
import { Link } from 'react-router-dom';
import './CapabilityPage.css';

const PhoneCallsPage = () => {
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
          <h1>Seamless Voice Calling Integration</h1>
          <p>Transform your business communications with AI-enhanced phone calls. Handle customer calls more efficiently than ever before.</p>
          <div className="hero-buttons">
            <Link to="https://solutions.tixaeagents.ai/eu/prototype/tTKtg6VdMS9UKvKg2WtU" className="primary-button">Book Demo</Link>
            <Link to="/" className="outline-button">View Pricing</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="/assets/img/phone-calls.png" 
            alt="Phone Calls Dashboard" 
            className="dashboard-preview" 
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Enhance Your Voice Communications</h2>
            <p>Our phone calling solution brings AI-powered features to your voice conversations, improving quality and efficiency.</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Call Routing</h3>
              <p>Direct calls to the right team members based on availability, expertise, and customer history.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 20.01L2.01 19.999M6 20.01L6.01 19.999M10 20.01L10.01 19.999M14 20.01L14.01 19.999M18 20.01L18.01 19.999M22 20.01L22.01 19.999" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Call Recording & Transcription</h3>
              <p>Automatically record calls and convert them to searchable text for training and reference.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18H12.01M7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-time AI Assistance</h3>
              <p>Get live suggestions and information during calls to provide faster, more accurate responses.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4754F0" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Call Queue Management</h3>
              <p>Efficiently manage high call volumes with smart queuing, callback options, and wait time estimates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="full-width-image-section">
        <div className="image-container">
          <img 
            src="/assets/img/phone-system.jpg" 
            alt="Advanced Phone System" 
            className="feature-image"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How Our Phone Call System Works</h2>
            <p>A comprehensive phone solution that integrates with your existing systems</p>
          </div>
          
          <div className="workflow-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Set Up Your Phone System</h3>
                <p>Quickly configure your phone numbers, IVR menus, and call routing preferences.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Connect With Your Team</h3>
                <p>Add agents and configure their availability, skills, and call handling preferences.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Enable AI Features</h3>
                <p>Activate call recording, transcription, sentiment analysis, and AI-powered call summaries.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Analyze & Optimize</h3>
                <p>Review call metrics and use AI-generated insights to improve customer interactions.</p>
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
              <span className="results-label">SUCCESS STORY</span>
              <h2>How VoiceConnect Transformed Their Call Center</h2>
              <p>Our phone solution helped VoiceConnect improve customer satisfaction while reducing operational costs.</p>
              
              <div className="testimonial">
                <p className="quote">"Since implementing Go Agents' phone system, our call resolution times decreased by 35% and our CSAT scores improved dramatically. The AI call assistants have been a game-changer for our agents."</p>
                <div className="testimonial-author">
                  <img src="/assets/img/user3.jpg" alt="Michael Roberts" />
                  <div>
                    <p className="author-name">Michael Roberts</p>
                    <p className="author-title">Call Center Manager, VoiceConnect</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="results-stats">
              <div className="stat-box">
                <h3>35%</h3>
                <p>Faster call resolution</p>
              </div>
              <div className="stat-box">
                <h3>28%</h3>
                <p>Increase in CSAT scores</p>
              </div>
              <div className="stat-box">
                <h3>40%</h3>
                <p>Reduction in call transfers</p>
              </div>
              <div className="stat-box">
                <h3>23%</h3>
                <p>Decrease in operating costs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Phone Communications?</h2>
          <p>Join hundreds of businesses enhancing their customer call experience with AI-powered tools.</p>
          <Link to="/signup" className="primary-button large">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default PhoneCallsPage; 