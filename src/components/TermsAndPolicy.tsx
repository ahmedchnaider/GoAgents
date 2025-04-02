import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const NavButton = styled(Link)<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background-color: #4754F0;
    color: white;
    &:hover {
      background-color: #3a45d1;
    }
  ` : `
    background-color: transparent;
    color: #4754F0;
    border: 1px solid #4754F0;
    &:hover {
      background-color: rgba(71, 84, 240, 0.05);
    }
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* Increased from 1000px */
  background: white;
  border-radius: 8px;
  margin-top: 100px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  padding: 60px; /* Increased from 40px */
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderImage = styled.img`
  height: 120px;
  width: auto;
  object-fit: contain;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 16px;
  max-width: 600px;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  color: #4754F0;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 26px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  font-weight: 600;
`;

const SubsectionTitle = styled.h3`
  color: #333;
  margin-top: 35px;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: #444;
  margin-bottom: 18px;
  line-height: 1.7;
  font-size: 16px;
`;

const List = styled.ul`
  margin-bottom: 24px;
  padding-left: 24px;
  
  li {
    margin-bottom: 12px;
    line-height: 1.7;
    color: #444;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 80px;
  padding: 30px 0 10px;
  color: #666;
  font-size: 14px;
  border-top: 1px solid #eee;
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CompanyLogo = styled.img`
  height: 32px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  justify-content: center;
  
  a {
    color: #4754F0;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.p`
  margin-top: 20px;
`;

const TableOfContents = styled.div`
  background-color: #f9fafc;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 40px;
  border: 1px solid #e8ecf2;
  
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
    font-weight: 600;
    font-size: 20px;
  }
`;

const TOCList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TOCItem = styled.div`
  margin-bottom: 10px;
  padding-left: ${(props: { level: number }) => props.level * 15}px;
  
  a {
    color: #4754F0;
    text-decoration: none;
    font-size: 15px;
    line-height: 1.6;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SectionImage = styled.div`
  margin: 30px 0;
  text-align: center;
  
  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    font-style: italic;
  }
`;

const LastUpdatedBadge = styled.div`
  display: inline-block;
  background-color: #f0f2f5;
  color: #666;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 10px;
`;

// Main component
const TermsAndPolicy: React.FC = () => {
  const lastUpdated = "January 1, 2024";
  
  // Function to handle smooth scrolling to sections without changing URL
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Container>
      <Header>
        <Link to="/">
          <Logo src="/assets/img/logo.png" alt="Tixae Agents Logo" />
        </Link>
        <NavButtons>
          <NavButton to="/login">Sign In</NavButton>
          <NavButton to="/signup" primary>Start for Free</NavButton>
        </NavButtons>
      </Header>
      
      <ContentWrapper>
        <HeaderSection>
          <HeaderContent>
            <Title>Terms of Service & Privacy Policy</Title>
            <Subtitle>
              This document outlines the terms of using Tixae Agents services and how we handle your data.
              Please read carefully before using our services.
            </Subtitle>
            <LastUpdatedBadge>Last Updated: {lastUpdated}</LastUpdatedBadge>
          </HeaderContent>
        </HeaderSection>
        
        <TableOfContents>
          <h3>Table of Contents</h3>
          <TOCList>
            <TOCItem level={1}><a href="#terms" onClick={(e) => scrollToSection(e, 'terms')}>1. Terms of Service</a></TOCItem>
            <TOCItem level={2}><a href="#acceptance" onClick={(e) => scrollToSection(e, 'acceptance')}>1.1 Acceptance of Terms</a></TOCItem>
            <TOCItem level={2}><a href="#description" onClick={(e) => scrollToSection(e, 'description')}>1.2 Service Description</a></TOCItem>
            <TOCItem level={2}><a href="#accounts" onClick={(e) => scrollToSection(e, 'accounts')}>1.3 User Accounts</a></TOCItem>
            <TOCItem level={2}><a href="#payment" onClick={(e) => scrollToSection(e, 'payment')}>1.4 Payment and Subscription</a></TOCItem>
            <TOCItem level={2}><a href="#credits" onClick={(e) => scrollToSection(e, 'credits')}>1.5 Credits and Usage</a></TOCItem>
            <TOCItem level={2}><a href="#intellectualproperty" onClick={(e) => scrollToSection(e, 'intellectualproperty')}>1.6 Intellectual Property Rights</a></TOCItem>
            <TOCItem level={1}><a href="#privacy" onClick={(e) => scrollToSection(e, 'privacy')}>2. Privacy Policy</a></TOCItem>
            <TOCItem level={2}><a href="#information" onClick={(e) => scrollToSection(e, 'information')}>2.1 Information We Collect</a></TOCItem>
            <TOCItem level={2}><a href="#use" onClick={(e) => scrollToSection(e, 'use')}>2.2 How We Use Your Information</a></TOCItem>
            <TOCItem level={2}><a href="#sharing" onClick={(e) => scrollToSection(e, 'sharing')}>2.3 Information Sharing</a></TOCItem>
            <TOCItem level={2}><a href="#data-security" onClick={(e) => scrollToSection(e, 'data-security')}>2.4 Data Security</a></TOCItem>
            <TOCItem level={2}><a href="#prohibited" onClick={(e) => scrollToSection(e, 'prohibited')}>1.7 Prohibited Uses</a></TOCItem>
            <TOCItem level={2}><a href="#termination" onClick={(e) => scrollToSection(e, 'termination')}>1.8 Termination</a></TOCItem>
            <TOCItem level={2}><a href="#disclaimers" onClick={(e) => scrollToSection(e, 'disclaimers')}>1.9 Disclaimers and Limitations</a></TOCItem>
            <TOCItem level={2}><a href="#indemnification" onClick={(e) => scrollToSection(e, 'indemnification')}>1.10 Indemnification</a></TOCItem>
            <TOCItem level={2}><a href="#modifications" onClick={(e) => scrollToSection(e, 'modifications')}>1.11 Modifications to Terms</a></TOCItem>
            <TOCItem level={2}><a href="#governing" onClick={(e) => scrollToSection(e, 'governing')}>1.12 Governing Law</a></TOCItem>
            <TOCItem level={2}><a href="#data-retention" onClick={(e) => scrollToSection(e, 'data-retention')}>2.5 Data Retention</a></TOCItem>
            <TOCItem level={2}><a href="#rights" onClick={(e) => scrollToSection(e, 'rights')}>2.6 Your Rights</a></TOCItem>
            <TOCItem level={2}><a href="#cookies" onClick={(e) => scrollToSection(e, 'cookies')}>2.7 Cookies and Tracking</a></TOCItem>
            <TOCItem level={2}><a href="#children" onClick={(e) => scrollToSection(e, 'children')}>2.8 Children's Privacy</a></TOCItem>
            <TOCItem level={2}><a href="#international" onClick={(e) => scrollToSection(e, 'international')}>2.9 International Data Transfers</a></TOCItem>
            <TOCItem level={2}><a href="#policy-changes" onClick={(e) => scrollToSection(e, 'policy-changes')}>2.10 Changes to Privacy Policy</a></TOCItem>
            <TOCItem level={2}><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>2.11 Contact Us</a></TOCItem>
          </TOCList>
        </TableOfContents>
        
        {/* Terms of Service Section */}
        <SectionTitle id="terms">1. Terms of Service</SectionTitle>
        
        <SectionImage>
          <img src="/assets/img/integrations.png" alt="Terms of Service" />
          <p>Our Terms of Service govern your use of Tixae Agents platform</p>
        </SectionImage>
        
        <SubsectionTitle id="acceptance">1.1 Acceptance of Terms</SubsectionTitle>
        <Paragraph>
          By accessing or using the Tixae Agents platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service. These Terms constitute a legally binding agreement between you and Tixae Agents LLC ("Company," "we," "us," or "our").
        </Paragraph>
        
        <SubsectionTitle id="description">1.2 Service Description</SubsectionTitle>
        <Paragraph>
          Tixae Agents provides AI-powered agent services, including but not limited to automated agents, tools, voice agents, and customizable solutions for businesses of various types. Our Service offers different subscription plans, each with specific features, credit allocations, and capabilities as described on our pricing page.
        </Paragraph>
        
        <SubsectionTitle id="accounts">1.3 User Accounts</SubsectionTitle>
        <Paragraph>
          To access certain features of the Service, you must register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated. You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security. We reserve the right to close your account at any time for any or no reason.
        </Paragraph>
        <Paragraph>
          You must be at least 18 years old to create an account. By creating an account, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.
        </Paragraph>
        
        <SubsectionTitle id="payment">1.4 Payment and Subscription Terms</SubsectionTitle>
        <Paragraph>
          We offer various subscription plans, including a free plan and paid plans with enhanced features. By selecting a paid plan, you agree to pay all fees associated with the plan you choose. Fees are payable in advance and are non-refundable, except as expressly provided in these Terms or as required by applicable law.
        </Paragraph>
        <Paragraph>
          Subscription fees are billed on a recurring basis according to the billing cycle you select when purchasing a subscription. You authorize us to charge your chosen payment method for the subscription fees. If your payment cannot be completed, we may suspend or terminate your account.
        </Paragraph>
        <Paragraph>
          We reserve the right to change our subscription plans or adjust pricing for our Service in any manner and at any time as we may determine in our sole and absolute discretion. Any price changes will become effective following notice to you.
        </Paragraph>
        <Paragraph>
          You may cancel your subscription at any time through your account settings or by contacting our customer support. Upon cancellation, your subscription will remain active until the end of your current billing period, after which it will not renew.
        </Paragraph>
        
        <SectionImage>
          <img src="/assets/img/subscription.jpg" alt="Subscription Plans" />
          <p>Our various subscription plans offer different features and credit allocations</p>
        </SectionImage>
        
        <SubsectionTitle id="credits">1.5 Credits and Usage</SubsectionTitle>
        <Paragraph>
          Our Service operates on a credit-based system, with different subscription plans offering different credit allocations. Credits are consumed when using various features of the Service, including but not limited to deploying agents, using tools, and processing data.
        </Paragraph>
        <Paragraph>
          Credits are valid for the duration of your billing cycle and do not roll over to the next billing cycle unless explicitly stated in your subscription plan. We reserve the right to modify the credit allocation, credit consumption rates, and features available at each subscription tier at our discretion.
        </Paragraph>
        <Paragraph>
          If you exhaust your credit allocation before the end of your billing cycle, you may purchase additional credits or upgrade your subscription plan to continue using the Service at full capacity.
        </Paragraph>
        
        <SubsectionTitle id="intellectualproperty">1.6 Intellectual Property Rights</SubsectionTitle>
        <Paragraph>
          The Service and its original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.
        </Paragraph>
        <Paragraph>
          You retain all rights to any content you submit, post, or display on or through the Service. By submitting, posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your content in any and all media or distribution methods now known or later developed.
        </Paragraph>
        <Paragraph>
          You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to grant the rights and licenses to your content as described in these Terms.
        </Paragraph>
        
        <SubsectionTitle id="prohibited">1.7 Prohibited Uses</SubsectionTitle>
        <Paragraph>
          You agree not to use the Service:
        </Paragraph>
        <List>
          <li>In any way that violates any applicable federal, state, local, or international law or regulation;</li>
          <li>To exploit, harm, or attempt to exploit or harm minors in any way;</li>
          <li>To transmit or procure the sending of any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation;</li>
          <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity;</li>
          <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm the Company or users of the Service or expose them to liability;</li>
          <li>To generate, distribute, or promote hate speech, discrimination, harassment, or violent content;</li>
          <li>To use the Service for any illegal, fraudulent, or unauthorized purpose;</li>
          <li>To attempt to circumvent any technological measure implemented by the Company to protect the Service or prevent or restrict access to any portion of the Service;</li>
          <li>To use the Service to store or transmit malicious code, or to interfere with or disrupt the integrity or performance of the Service;</li>
          <li>To attempt to probe, scan, or test the vulnerability of the Service or any related system or network.</li>
        </List>
        
        <SubsectionTitle id="termination">1.8 Termination</SubsectionTitle>
        <Paragraph>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
        </Paragraph>
        <Paragraph>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to delete your account.
        </Paragraph>
        <Paragraph>
          All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </Paragraph>
        
        <SubsectionTitle id="disclaimers">1.9 Disclaimers and Limitations of Liability</SubsectionTitle>
        <Paragraph>
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
        </Paragraph>
        <Paragraph>
          THE COMPANY, ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT WARRANT THAT (A) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (D) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.
        </Paragraph>
        <Paragraph>
          IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; AND (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
        </Paragraph>
        <Paragraph>
          IN NO EVENT WILL OUR AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE SERVICE EXCEED THE GREATER OF $100 USD OR THE AMOUNT PAID BY YOU TO THE COMPANY FOR THE SERVICE IN THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
        </Paragraph>
        <Paragraph>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, WHICH MEANS THAT SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN THESE JURISDICTIONS, OUR LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.
        </Paragraph>
        
        <SubsectionTitle id="indemnification">1.10 Indemnification</SubsectionTitle>
        <Paragraph>
          You agree to defend, indemnify, and hold harmless the Company, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Service; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your content caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Service.
        </Paragraph>
        
        <SubsectionTitle id="modifications">1.11 Modifications to Terms</SubsectionTitle>
        <Paragraph>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Paragraph>
        <Paragraph>
          By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
        </Paragraph>
        
        <SubsectionTitle id="governing">1.12 Governing Law</SubsectionTitle>
        <Paragraph>
          These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
        </Paragraph>
        <Paragraph>
          Any disputes arising out of or relating to these Terms or the Service shall be resolved exclusively in the federal or state courts located in [JURISDICTION], and you consent to the personal jurisdiction of those courts.
        </Paragraph>
        
        {/* Privacy Policy Section */}
        <SectionTitle id="privacy">2. Privacy Policy</SectionTitle>
        
        <SectionImage>
          <img src="/assets/img/support.png" alt="Privacy Protection" />
          <p>We take the privacy and security of your data seriously</p>
        </SectionImage>
        
        <SubsectionTitle id="information">2.1 Information We Collect</SubsectionTitle>
        <Paragraph>
          We collect several types of information from and about users of our Service, including:
        </Paragraph>
        <List>
          <li><strong>Personal Information:</strong> Information that can identify you as an individual, such as your name, email address, telephone number, postal address, payment information, and business type.</li>
          <li><strong>Account Information:</strong> Information associated with your account, including username, password, account settings, and subscription status.</li>
          <li><strong>Usage Data:</strong> Information about how you use our Service, including the features you access, the time spent on the Service, and the actions you perform.</li>
          <li><strong>Agent Data:</strong> Information related to the agents you create and deploy, including configurations, settings, and performance metrics.</li>
          <li><strong>Technical Information:</strong> Information about your device and internet connection, including your IP address, browser type, operating system, and device identifiers.</li>
          <li><strong>Payment Information:</strong> When you purchase a subscription or additional credits, we collect payment information, which may include credit card numbers, billing addresses, and other financial information. All payment data is stored by our payment processor (Stripe), and we do not directly collect or store full payment card information.</li>
        </List>
        
        <SubsectionTitle id="use">2.2 How We Use Your Information</SubsectionTitle>
        <Paragraph>
          We use the information we collect for various purposes, including:
        </Paragraph>
        <List>
          <li>To provide, maintain, and improve our Service;</li>
          <li>To process transactions and manage your account, including verifying your identity;</li>
          <li>To send you technical notices, updates, security alerts, and administrative messages;</li>
          <li>To respond to your comments, questions, and requests, and provide customer service;</li>
          <li>To communicate with you about products, services, offers, promotions, and events, and provide other news or information about us and our partners;</li>
          <li>To monitor and analyze trends, usage, and activities in connection with our Service;</li>
          <li>To detect, prevent, and address technical issues, fraud, or illegal activities;</li>
          <li>To personalize and improve the Service, including developing new products and features;</li>
          <li>To fulfill any other purpose for which you provide it or for which we have obtained your consent.</li>
        </List>
        
        <SubsectionTitle id="sharing">2.3 Information Sharing and Disclosure</SubsectionTitle>
        <Paragraph>
          We may disclose personal information that we collect or you provide as described in this Privacy Policy:
        </Paragraph>
        <List>
          <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform functions on our behalf, such as payment processors, hosting providers, analytics providers, and customer service providers.</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
          <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of the Company, our users, or others.</li>
          <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
        </List>
        <Paragraph>
          We do not sell, rent, or lease your personal information to third parties without your explicit consent.
        </Paragraph>
        
        <SubsectionTitle id="data-security">2.4 Data Security</SubsectionTitle>
        <Paragraph>
          We have implemented appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </Paragraph>
        <Paragraph>
          We maintain administrative, technical, and physical safeguards designed to protect against the loss, misuse, or unauthorized access, disclosure, alteration, or destruction of the information you provide when using our Service.
        </Paragraph>
        
        <SectionImage>
          <img src="/assets/img/data-security.png" alt="Data Security" />
          <p>We implement robust security measures to protect your information</p>
        </SectionImage>
        
        <SubsectionTitle id="data-retention">2.5 Data Retention</SubsectionTitle>
        <Paragraph>
          We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
        </Paragraph>
        <Paragraph>
          If you request deletion of your account, we will delete your personal information from our active databases, though we may retain certain information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms, and/or comply with legal requirements.
        </Paragraph>
        
        <SubsectionTitle id="rights">2.6 Your Rights</SubsectionTitle>
        <Paragraph>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </Paragraph>
        <List>
          <li><strong>Access:</strong> You have the right to request access to the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You have the right to request that we correct inaccurate or incomplete information about you.</li>
          <li><strong>Deletion:</strong> You have the right to request the deletion of your personal information in certain circumstances.</li>
          <li><strong>Restriction:</strong> You have the right to request that we restrict the processing of your personal information in certain circumstances.</li>
          <li><strong>Data Portability:</strong> You have the right to receive a copy of your personal information in a structured, machine-readable format.</li>
          <li><strong>Objection:</strong> You have the right to object to our processing of your personal information in certain circumstances.</li>
          <li><strong>Withdraw Consent:</strong> If we process your personal information based on your consent, you have the right to withdraw that consent at any time.</li>
        </List>
        <Paragraph>
          To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy. We may need to verify your identity before fulfilling your request.
        </Paragraph>
        
        <SubsectionTitle id="cookies">2.7 Cookies and Tracking Technologies</SubsectionTitle>
        <Paragraph>
          We use cookies and similar tracking technologies to track activity on our Service and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
        </Paragraph>
        <Paragraph>
          We use cookies for various purposes, including:
        </Paragraph>
        <List>
          <li>To enable certain functions of the Service;</li>
          <li>To provide analytics;</li>
          <li>To store your preferences;</li>
          <li>To personalize your experience;</li>
          <li>To help us understand how our Service is being used;</li>
          <li>To authenticate users and prevent fraudulent use of user accounts.</li>
        </List>
        <Paragraph>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </Paragraph>
        
        <SubsectionTitle id="children">2.8 Children's Privacy</SubsectionTitle>
        <Paragraph>
          Our Service is not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from Children. If you are a parent or guardian and you are aware that your Child has provided us with personal information, please contact us. If we become aware that we have collected personal information from Children without verification of parental consent, we take steps to remove that information from our servers.
        </Paragraph>
        
        <SubsectionTitle id="international">2.9 International Data Transfers</SubsectionTitle>
        <Paragraph>
          Your information, including personal information, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
        </Paragraph>
        <Paragraph>
          If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including personal information, to the United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </Paragraph>
        <Paragraph>
          We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy, and no transfer of your personal information will take place to an organization or a country unless there are adequate controls in place, including the security of your data and other personal information.
        </Paragraph>
        
        <SubsectionTitle id="policy-changes">2.10 Changes to This Privacy Policy</SubsectionTitle>
        <Paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
        </Paragraph>
        <Paragraph>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </Paragraph>
        
        <SubsectionTitle id="contact">2.11 Contact Us</SubsectionTitle>
        <Paragraph>
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </Paragraph>
        <Paragraph>
          Tixae Agents LLC<br />
          Email: privacy@tixaeagents.ai<br />
          Address: [Company Address]
        </Paragraph>
        
        <Footer>
          <CompanyInfo>
            <CompanyLogo src="/assets/img/logo.png" alt="Tixae Agents Logo" />
            <FooterLinks>
              <Link to="/">Home</Link>
              <Link to="/login">Sign In</Link>
              <Link to="/signup">Start Free Trial</Link>
            </FooterLinks>
          </CompanyInfo>
          <Copyright>
            © {new Date().getFullYear()} Tixae Agents LLC. All rights reserved.
          </Copyright>
        </Footer>
      </ContentWrapper>
    </Container>
  );
};

export default TermsAndPolicy; 