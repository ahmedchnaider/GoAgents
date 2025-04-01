import React from 'react';
import { Link } from 'react-router-dom';
import './CapabilityPage.css';

const CapabilityPage = ({ data }) => {
  const {
    title,
    description,
    heroImage,
    featureImage,
    benefits,
    workflow,
    testimonial,
    stats,
    ctaTitle,
    ctaDescription
  } = data;

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
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="hero-buttons">
            <Link to="https://solutions.tixaeagents.ai/eu/prototype/tTKtg6VdMS9UKvKg2WtU" className="primary-button">Book Demo</Link>
            <Link to="/" className="outline-button">View Pricing</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src={heroImage} 
            alt={title}
            className="dashboard-preview" 
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{benefits.title}</h2>
            <p>{benefits.description}</p>
          </div>
          
          <div className="benefits-grid">
            {benefits.items.map((benefit, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-icon" dangerouslySetInnerHTML={{ __html: benefit.icon }} />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="full-width-image-section">
        <div className="image-container">
          <img 
            src={featureImage} 
            alt={`${title} Feature`}
            className="feature-image"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{workflow.title}</h2>
            <p>{workflow.description}</p>
          </div>
          
          <div className="workflow-process">
            {workflow.steps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="section-container">
          <div className="results-content">
            <div className="results-text">
              <span className="results-label">{testimonial.label}</span>
              <h2>{testimonial.title}</h2>
              <p>{testimonial.description}</p>
              
              <div className="testimonial">
                <p className="quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.authorImage} alt={testimonial.authorName} />
                  <div>
                    <p className="author-name">{testimonial.authorName}</p>
                    <p className="author-title">{testimonial.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="results-stats">
              {stats.map((stat, index) => (
                <div className="stat-box" key={index}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>{ctaTitle}</h2>
          <p>{ctaDescription}</p>
          <Link to="/signup" className="primary-button large">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default CapabilityPage; 