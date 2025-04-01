import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background: white;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const CardLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 16px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #4754F0;
  width: ${props => props.progress}%;
`;

const ProgressText = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 5px;
`;

const DiscordSection = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 14px;
`;

const DiscordLink = styled.a`
  color: #4754F0;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Main Classroom Component
const Classroom: React.FC = () => {
  const navigate = useNavigate();
  
  // Add TIXAE Agents chat widget
  useEffect(() => {
    // Create the overlay container div
    const overlayContainer = document.createElement('div');
    overlayContainer.id = 'VG_OVERLAY_CONTAINER';
    overlayContainer.style.width = '0';
    overlayContainer.style.height = '0';
    document.body.appendChild(overlayContainer);

    // Create and inject the script
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        window.VG_CONFIG = {
            ID: "tyaf2dtuctpjwx5k", // YOUR AGENT ID
            region: 'eu', // YOUR ACCOUNT REGION 
            render: 'bottom-right', // can be 'full-width' or 'bottom-left' or 'bottom-right'
            stylesheets: [
                // Base TIXAE Agents CSS
                "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
            ],
        }
        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
      })()
    `;
    document.body.appendChild(script);

    // Cleanup function to remove the elements when component unmounts
    return () => {
      if (overlayContainer && document.body.contains(overlayContainer)) {
        document.body.removeChild(overlayContainer);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const generateRandomRoute = () => {
    return uuidv4().substring(0, 8);
  };

  const courseModules = [
    {
      id: "start-here",
      title: "Start Here",
      description: "Begin your journey to creating a profitable and scalable AI business here.",
      imageSrc: "/assets/img/courses/start-here.jpg",
      progress: 0
    },
    {
      id: "aaa-model",
      title: "The AAA Model",
      description: "Before you dive into building your AAA, you must first understand the model and the fundamentals.",
      imageSrc: "/assets/img/courses/aaa-model.jpg",
      progress: 0
    },
    {
      id: "success-stories",
      title: "Success Stories",
      description: "Hear the stories from regular people taking the AAA opportunity and seeing life-changing results.",
      imageSrc: "/assets/img/courses/success-stories.jpg",
      progress: 0
    },
    {
      id: "mindset",
      title: "Mindset",
      description: "Even with the perfect business model and perfect timing, without the right mindset you won't succeed.",
      imageSrc: "/assets/img/courses/mindset.jpg",
      progress: 0
    },
    {
      id: "ai-foundations",
      title: "AI Foundations",
      description: "Before you start your AI Automation Agency, you need to build a base of AI Automation knowledge.",
      imageSrc: "/assets/img/courses/ai-foundations.jpg",
      progress: 0
    },
    {
      id: "launch",
      title: "Launch",
      description: "With your skills, mindset and understanding of the business model, you're ready to pick your niche.",
      imageSrc: "/assets/img/courses/launch.jpg",
      progress: 0
    }
  ];

  const handleCardClick = (moduleId: string) => {
    const randomRoute = generateRandomRoute();
    navigate(`/classroom/${moduleId}/${randomRoute}`);
  };

  return (
    <Container>
      <Header>
        <Logo src="/assets/img/logo.png" alt="Logo" />
      </Header>
      <ContentWrapper>
        <Title>AI Agents Builders Academy</Title>
        <Subtitle>
          Welcome to your learning dashboard. Complete each module to master the skills of building, deploying, and monetizing AI agents.
        </Subtitle>
        
        <CourseGrid>
          {courseModules.map(module => (
            <CourseCard key={module.id} onClick={() => handleCardClick(module.id)}>
              <CardImageWrapper>
                <CardImage src={module.imageSrc} alt={module.title} />
                <CardOverlay>
                  <CardLogo>//A</CardLogo>
                  <CardTitle>{module.title}</CardTitle>
                </CardOverlay>
              </CardImageWrapper>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
                <ProgressContainer>
                  <ProgressBar progress={module.progress} />
                </ProgressContainer>
                <ProgressText>{module.progress}%</ProgressText>
              </CardContent>
            </CourseCard>
          ))}
        </CourseGrid>
        
        
      </ContentWrapper>
      <DiscordSection>
          Need more help? Join our <DiscordLink href="https://discord.gg/aiagents" target="_blank" rel="noopener noreferrer">Discord Community</DiscordLink> for expert advice and discussions.
        </DiscordSection>
    </Container>
  );
};

export default Classroom; 