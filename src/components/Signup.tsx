import React, { useState, FormEvent, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
// Remove Stripe imports
// Import API configuration
import { endpoint } from '../api/config';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/assets/img/Herobg.jpg') no-repeat center center;
  background-size: cover;
  align-items: center;
  padding: 20px;
  padding-top: 70px;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 35px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  margin-top: 110px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: 650px;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 0;
  border-right: 1px solid #f0f0f0;
`;

const HeaderSection = styled.div`
  background: #4754F0;
  color: white;
  padding: 24px;
  text-align: center;
  border-radius: 8px 0 0 0;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const HeaderSubtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
`;

const FormContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 76px); /* Subtract header height */
  justify-content: center; /* Center content vertically */

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: auto 0; /* This will push the form to the center */
  }
`;

const Divider = styled.div`
  text-align: center;
  position: relative;
  margin: 24px 0;
  
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e0e0e0;
  }
  
  &:before { left: 0; }
  &:after { right: 0; }
  
  span {
    background: white;
    padding: 0 10px;
    color: #6c757d;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px; /* Slightly increased padding */
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0; /* Remove margin since we're using gap */
  background: ${props => props.type === 'email' ? '#f0f4f8' : 'white'};

  &:focus {
    outline: none;
    border-color: #4754F0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px; /* Match Input padding */
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0; /* Remove margin since we're using gap */
  color: #495057;
  appearance: auto;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 16px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  
  a {
    color: #4754F0;
    text-decoration: none;
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${props => props.disabled ? '#a0a0a0' : '#4754F0'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 500;
  
  &:hover {
    background: ${props => props.disabled ? '#a0a0a0' : '#3a45d1'};
  }
`;

const SignInText = styled.div`
  text-align: center;
  padding: 24px 0;
  font-size: 14px;
  border-top: 1px solid #e0e0e0;
  margin-top: 32px;
  
  a {
    color: #4754F0;
    text-decoration: none;
    font-weight: 500;
    margin-left: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PlanSection = styled.div`
  width: 350px;
  padding: 24px;
`;

const PlanTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const PlanCard = styled.div<{ selected?: boolean; disabled?: boolean }>`
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#4754F0' : '#e0e0e0'};
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  position: relative;
  
  &:hover {
    border-color: ${props => props.disabled ? '#e0e0e0' : '#4754F0'};
  }
`;

const PlanInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanTitle2 = styled.span`
  font-weight: 500;
  margin-bottom: 4px;
`;

const PlanDescription = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

const PlanPrice = styled.span`
  color: #4754F0;
  font-weight: 500;
`;

const RecommendedBadge = styled.div`
  background-color: #4754F0;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const TrustedSection = styled.div`
  margin-top: 24px;
`;

const TrustedTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 600;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
`;

const SocialIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f5f5f5;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: #4754F0;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
`;

// Main Signup component
const Signup: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<{
    fullName: string;
    lastName: string;
    email: string;
    password: string;
    businessType: string;
    agreeToTerms: boolean;
  }>({
    fullName: '',
    lastName: '',
    email: '',
    password: '',
    businessType: '',
    agreeToTerms: false
  });

  // Only include the free plan
  const plans = [
    { id: 'free', title: 'Free Plan', description: '500 Credits · 1 Agent', price: '$0', amount: 0 }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan('free');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate required fields
    if (!formData.fullName || !formData.lastName || !formData.email || !formData.password || !formData.businessType) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service');
      setLoading(false);
      return;
    }

    // Always continue with signup process (no payment modal)
    await completeSignup();
  };

  const completeSignup = async (): Promise<void> => {
    try {
      setLoading(true);
      // Prepare data for API call
      const fullName = `${formData.fullName} ${formData.lastName}`;
      const signupData = {
        name: fullName,
        email: formData.email,
        password: formData.password,
        businessType: formData.businessType,
        plan: 'free' // Always use free plan
      };
      
      // Make API call to backend using the endpoint helper
      const response = await fetch(endpoint('/api/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          throw new Error('User already exists');
        } else {
          throw new Error(errorData.message || 'Signup failed');
        }
      }

      const data = await response.json();
      
      // Redirect to solutions.tixaeagents.ai
      window.location.href = process.env.REACT_APP_DASHBOARD_URL || 'https://solutions.tixaeagents.ai';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Logo src="/assets/img/logo.png" alt="Logo" />
      </Header>
      <ContentWrapper>
        <FormSection>
          <HeaderSection>
            <HeaderTitle>Create your account</HeaderTitle>
            <HeaderSubtitle>Get started with your free account</HeaderSubtitle>
          </HeaderSection>
          <FormContent>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Input 
                  type="text" 
                  id="fullName" 
                  placeholder="First Name" 
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
                <Input 
                  type="text" 
                  id="lastName" 
                  placeholder="Last Name" 
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
              </InputGroup>
              <Input 
                type="email" 
                id="email" 
                placeholder="Email" 
                onChange={handleInputChange}
                value={formData.email}
              />
              <Input 
                type="password" 
                id="password" 
                placeholder="Password" 
                onChange={handleInputChange}
                value={formData.password}
              />
              <Select 
                id="businessType" 
                onChange={handleInputChange}
                value={formData.businessType}
              >
                <option value="">Select Business Type</option>
                <option value="dropshipper">Dropshipper</option>
                <option value="themePage">Theme Page</option>
                <option value="influencer">Influencer</option>
                <option value="other">Other</option>
              </Select>
              
              <CheckboxContainer>
                <Checkbox 
                  type="checkbox" 
                  id="agreeToTerms" 
                  onChange={handleInputChange}
                  checked={formData.agreeToTerms}
                />
                <CheckboxLabel htmlFor="agreeToTerms">
                  I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                </CheckboxLabel>
              </CheckboxContainer>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <SignInText>
                Already have an account?<Link to="/login">Sign in</Link>
              </SignInText>
            </form>
          </FormContent>
        </FormSection>
        
        <PlanSection>
          <PlanTitle>Choose your plan</PlanTitle>
          
          {plans.map(plan => (
            <PlanCard 
              key={plan.id} 
              selected={selectedPlan === plan.id}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <PlanInfo>
                <PlanDetails>
                  <PlanTitle2>{plan.title}</PlanTitle2>
                  <PlanDescription>{plan.description}</PlanDescription>
                </PlanDetails>
                <PlanPrice>{plan.price}</PlanPrice>
              </PlanInfo>
            </PlanCard>
          ))}
          
          <RecommendedBadge>All features included</RecommendedBadge>
          
          <TrustedSection>
            <TrustedTitle>Trusted by businesses worldwide</TrustedTitle>
            <SocialIcons>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialIcon>
            </SocialIcons>
          </TrustedSection>
        </PlanSection>
      </ContentWrapper>
    </Container>
  );
};

export default Signup; 