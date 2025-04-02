import React from 'react';
import { Link } from 'react-router-dom';
import './CapabilityPage.css';

const ToolsPage = () => {
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
          <h1>Automation Using Zapier & Make</h1>
          <p>Connect your favorite tools and automate workflows with our powerful integration platform. No coding required.</p>
          <div className="hero-buttons">
            <Link to="https://solutions.tixaeagents.ai/eu/prototype/tTKtg6VdMS9UKvKg2WtU" className="primary-button">Book Demo</Link>
            <Link to="/" className="outline-button">View Pricing</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="/assets/img/tools.jpg" 
            alt="Automation Tools Integration" 
            className="dashboard-preview" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Seamlessly Integrate Your Business Tools</h2>
            <p>Connect with 3,000+ apps and create automated workflows that save time and reduce errors.</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Native Integrations</h3>
              <p>Connect with Zapier, Make (formerly Integromat), and thousands of other popular business applications.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Visual Workflow Builder</h3>
              <p>Create complex automations with our intuitive drag-and-drop interface. No coding knowledge required.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4393 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60706C11.7642 9.26329 11.0684 9.05886 10.3533 9.00764C9.63816 8.95641 8.92037 9.05951 8.24861 9.31006C7.57685 9.56061 6.96684 9.95286 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Bi-directional Data Flow</h3>
              <p>Sync data between applications in real-time, ensuring your systems are always up to date.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11H21" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 21H13" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H10" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 15H15" stroke="#4754F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Pre-built Templates</h3>
              <p>Get started quickly with pre-configured automation templates for common business scenarios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="full-width-image-section">
        <div className="image-container">
          <img 
            src="/assets/img/webphone.png" 
            alt="Zapier and Make Integration" 
            className="feature-image"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Create Powerful Automations in Minutes</h2>
            <p>Our platform makes it easy to connect your tools and automate repetitive tasks</p>
          </div>
          
          <div className="workflow-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Connect Your Apps</h3>
                <p>Easily integrate with Zapier, Make, and thousands of business applications.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Define Triggers & Actions</h3>
                <p>Specify what events should trigger your automation and what actions should follow.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Map Your Data</h3>
                <p>Define how information should flow between your applications with our simple mapping tools.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Test & Launch</h3>
                <p>Test your automation with real data, then activate it to start saving time immediately.</p>
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
              <span className="results-label">CUSTOMER SPOTLIGHT</span>
              <h2>How DataSync Streamlined Their Operations</h2>
              <p>See how DataSync used our integration platform to automate their workflows and improve productivity.</p>
              
              <div className="testimonial">
                <p className="quote">"By connecting our CRM, project management, and invoicing systems with Go Agents' integration platform, we've automated over 15 workflows that used to require manual entry. Our team is saving 20+ hours per week."</p>
                <div className="testimonial-author">
                  <img src="/assets/img/user2.jpg" alt="Jennifer Chen" />
                  <div>
                    <p className="author-name">Jennifer Chen</p>
                    <p className="author-title">Operations Director, DataSync Solutions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="results-stats">
              <div className="stat-box">
                <h3>20+</h3>
                <p>Hours saved per week</p>
              </div>
              <div className="stat-box">
                <h3>98%</h3>
                <p>Reduction in data errors</p>
              </div>
              <div className="stat-box">
                <h3>15</h3>
                <p>Workflows automated</p>
              </div>
              <div className="stat-box">
                <h3>3x</h3>
                <p>Faster customer onboarding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Automate Your Business Processes?</h2>
          <p>Join thousands of companies using our platform to connect their tools and streamline their workflows.</p>
          <Link to="/signup" className="primary-button large">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage; 