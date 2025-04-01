import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
// Import API configuration
import { endpoint, STRIPE_PUBLISHABLE_KEY } from '../api/config';

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

const PaymentSectionWrapper = styled.div<{ visible: boolean }>`
  margin-top: 20px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const PaymentSectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 600;
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

// Add these new styled components
const PaymentContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const PaymentForm = styled.form`
  width: 100%;
`;

const PayButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${props => props.disabled ? '#a0a0a0' : '#4754F0'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 500;
  margin-top: 20px;
  
  &:hover {
    background: ${props => props.disabled ? '#a0a0a0' : '#3a45d1'};
  }
`;

const SuccessMessage = styled.div`
  color: #28a745;
  margin-top: 10px;
  font-size: 14px;
`;

// Add a new Modal component
const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  
  &:hover {
    color: #333;
  }
`;

// Update the checkout form component to use Link Payment Element
const CheckoutForm = ({ 
  amount, 
  plan, 
  onPaymentSuccess,
  onPaymentError 
}: { 
  amount: number, 
  plan: string,
  onPaymentSuccess?: () => void,
  onPaymentError?: (message: string) => void
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(undefined);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
      if (onPaymentError) onPaymentError(error.message || 'Payment failed');
    } else {
      setPaymentSuccessful(true);
      if (onPaymentSuccess) onPaymentSuccess();
    }

    setIsLoading(false);
  };

  return (
    <PaymentForm onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {paymentSuccessful && <SuccessMessage>Payment successful!</SuccessMessage>}
      <PayButton disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </PayButton>
    </PaymentForm>
  );
};

// Update the Stripe wrapper component
const InlineStripePayment = ({ 
  amount, 
  plan, 
  onPaymentSuccess,
  onPaymentError
}: { 
  amount: number, 
  plan: string, 
  onPaymentSuccess?: () => void,
  onPaymentError?: (message: string) => void
}) => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  // Load Stripe outside of component render to avoid recreating Stripe object on every render
  // Use environment variable for Stripe publishable key
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || '');

  useEffect(() => {
    let isActive = true; // Flag to prevent state updates after unmount
    
    const createPaymentIntent = async () => {
      if (amount <= 0 || isLoading) return;
      
      setIsLoading(true);
      
      try {
        const response = await fetch(endpoint('/api/stripe/create-payment-intent'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            amount, 
            plan,
            payment_method_types: ['card', 'link'],
            enable_link: true
          }),
        });
        
        const data = await response.json();
        
        if (isActive) {
          setClientSecret(data.clientSecret);
          // Extract payment intent ID from the client secret (format: pi_XXXX_secret_YYYY)
          const piId = data.clientSecret.split('_secret_')[0];
          setPaymentIntentId(piId);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        if (isActive && onPaymentError) {
          onPaymentError('Failed to prepare payment');
          setIsLoading(false);
        }
      }
    };

    // Only create a new payment intent if we don't have one for the current amount/plan
    createPaymentIntent();
    
    // Cleanup function to cancel abandoned payment intents
    return () => {
      isActive = false;
      
      // Cancel abandoned payment intent when component unmounts
      if (paymentIntentId) {
        fetch(endpoint('/api/stripe/cancel-payment-intent'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId })
        }).catch(err => console.error('Error canceling payment intent:', err));
      }
    };
  }, [amount, plan]); // Only re-run when amount or plan changes

  return (
    <PaymentContainer>
      {clientSecret && stripePromise && (
        // Use a key to force remount when clientSecret changes
        <Elements 
          key={clientSecret}
          stripe={stripePromise} 
          options={{ 
            clientSecret, 
            appearance: { theme: 'stripe' }
          }}
        >
          <CheckoutForm 
            amount={amount} 
            plan={plan} 
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
          />
        </Elements>
      )}
      {isLoading && <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading payment form...</div>}
    </PaymentContainer>
  );
};

// Main Signup component
const Signup: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [planAmount, setPlanAmount] = useState<number>(0);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const plans = [
    { id: 'free', title: 'Free Plan', description: '500 Credits · 1 Agent', price: '$0', amount: 0 },
    { id: 'silver', title: 'Silver', description: '5k Credits · 5 Agents · 2 Tools', price: '$29', amount: 2900 },
    { id: 'gold', title: 'Gold', description: '15k Credits · 10 Agents · Voice Agent', price: '$99', amount: 9900 },
    { id: 'diamond', title: 'Diamond', description: '50k Credits · 20 Agents · White Label', price: '$249', amount: 24900 }
  ];

  useEffect(() => {
    // Find the selected plan and set its amount
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      setPlanAmount(plan.amount);
      setShowPayment(plan.amount > 0);
    }
  }, [selectedPlan]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setPlanAmount(plan.amount);
      setShowPayment(plan.amount > 0);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setIsPaymentModalOpen(false);
    completeSignup();
  };

  const handlePaymentError = (message: string) => {
    setError(message);
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

    // If paid plan is selected, show payment modal
    if (selectedPlan !== 'free') {
      setLoading(false);
      setIsPaymentModalOpen(true);
      return;
    }

    // For free plan, continue with signup process
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
        plan: selectedPlan,
        paymentCompleted: paymentCompleted
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
        <Link to="/">
          <Logo src="/assets/img/logo.png" alt="Logo" />
        </Link>
      </Header>
      <ContentWrapper>
        <FormSection>
          <HeaderSection>
            <HeaderTitle>Create Your Free Account</HeaderTitle>
            <HeaderSubtitle>Start your free trial. No credit card required.</HeaderSubtitle>
          </HeaderSection>
          
          <FormContent>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Input 
                  type="text" 
                  placeholder="Full Name"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <Input 
                  type="text" 
                  placeholder="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </InputGroup>

              <Input 
                type="email" 
                placeholder="Email address"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ backgroundColor: '#f0f4f8' }}
              />

              <Input 
                type="password" 
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ backgroundColor: '#f0f4f8' }}
              />

              <Select
                id="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>Select your business type</option>
                <option value="dropshipper">Dropshipper</option>
                <option value="influencer">Influencer</option>
                <option value="themePage">Theme Page</option>
                <option value="other">Other</option>
              </Select>

              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="agreeToTerms">
                  I agree to the <Link to="/terms-and-policy" target="_blank">Terms of Service</Link> and <Link to="/terms-and-policy" target="_blank">Privacy Policy</Link>
                </CheckboxLabel>
              </CheckboxContainer>

              <Button type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>

            <SignInText>
              Already have an account? <Link to="/login">Sign in</Link>
            </SignInText>
          </FormContent>
        </FormSection>

        <PlanSection>
          <PlanTitle>Choose your plan:</PlanTitle>
          {plans.map(plan => (
            <PlanCard 
              key={plan.id}
              selected={selectedPlan === plan.id}
              onClick={() => plan.id === 'free' && handlePlanSelect(plan.id)}
              disabled={plan.id !== 'free'}
            >
              {plan.id !== 'free' && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ff6b6b',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  Coming Soon
                </div>
              )}
              <PlanInfo>
                <PlanDetails>
                  <PlanTitle2>{plan.title}</PlanTitle2>
                  <PlanDescription>{plan.description}</PlanDescription>
                </PlanDetails>
                <PlanPrice>{plan.price}</PlanPrice>
              </PlanInfo>
            </PlanCard>
          ))}

          <TrustedSection>
            <TrustedTitle>Trusted by leading companies</TrustedTitle>
            <SocialIcons>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.263-5.963 3.26L10.732 8l3.131 3.263 5.887-3.26-6.559 6.96z"/>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.375-.444.864-.608 1.25a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.25.077.077 0 00-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
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
      
      {/* Add payment modal */}
      <Modal isOpen={isPaymentModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Complete Payment</ModalTitle>
            <CloseButton onClick={() => setIsPaymentModalOpen(false)}>×</CloseButton>
          </ModalHeader>
          
          <InlineStripePayment 
            amount={planAmount} 
            plan={selectedPlan}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Signup; 