import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useParams, Link } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/assets/img/Herobg.jpg') no-repeat center center fixed;
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
  justify-content: space-between;
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

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #4754F0;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  min-height: 600px;
`;

const ModuleHeader = styled.div`
  margin-bottom: 30px;
`;

const ModuleTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #4754F0;
  width: ${props => props.progress}%;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const ModuleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Updated LessonCard to be the clickable header
const LessonCard = styled.div<{ isExpanded: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isExpanded ? '0 5px 15px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  background: white;
`;

// Fix for the LessonHeader component - use a custom prop instead of theme
interface LessonHeaderProps {
  isExpanded: boolean;
}

const LessonHeader = styled.div<LessonHeaderProps>`
  display: flex;
  cursor: pointer;
  background-color: ${props => props.isExpanded ? '#f8f9fa' : 'white'};
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const LessonNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  font-weight: 600;
  color: #4754F0;
`;

const LessonInfo = styled.div`
  flex: 1;
  padding: 16px;
`;

const LessonTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const LessonDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
`;

const LessonDuration = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6c757d;
`;

const ExpandIcon = styled.div<{ isExpanded: boolean }>`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #6c757d;
  transition: transform 0.3s ease;
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

// Content that appears when a lesson is expanded - fixed to prevent layout disruption
const LessonExpandedContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '2000px' : '0'};
  opacity: ${props => props.isExpanded ? '1' : '0'};
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  border-top: ${props => props.isExpanded ? '1px solid #e9ecef' : 'none'};
  background-color: #f8f9fa;
  padding: ${props => props.isExpanded ? '0 20px 20px' : '0 20px'};
`;

const VideoContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const ResourcesSection = styled.div`
  margin-top: 24px;
`;

const ResourcesTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const ResourcesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ResourceItem = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  color: #4754F0;
  text-decoration: none;
  font-size: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const FullDescription = styled.div`
  margin-top: 24px;
`;

const DescriptionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const DescriptionText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #495057;
`;

// Helper function to get module data by ID
const getModuleById = (moduleId: string) => {
  const modules = {
    "start-here": {
      title: "Start Here",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "Introduction to AI Agents", 
          description: "Learn what AI agents are and how they work", 
          duration: "10 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "In this video, you'll get a comprehensive introduction to AI agents and how they're transforming businesses and personal productivity. We'll cover the fundamental concepts, types of AI agents, and real-world applications that are changing how we work.",
          resources: [
            { type: "pdf", name: "AI Agents Cheat Sheet", url: "/resources/ai-agents-cheatsheet.pdf" },
            { type: "doc", name: "Getting Started Guide", url: "/resources/getting-started.docx" },
            { type: "link", name: "Additional Reading", url: "https://example.com/ai-agents" }
          ]
        },
        { 
          number: 2, 
          title: "Overview of the Course", 
          description: "What you'll learn and how to succeed", 
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "This video walks you through everything you'll learn in this course. From building your first agent to deploying complex solutions, we map out your learning journey and share tips for getting the most out of each module.",
          resources: [
            { type: "pdf", name: "Course Outline", url: "/resources/course-outline.pdf" },
            { type: "link", name: "Learning Path", url: "https://example.com/learning-path" }
          ]
        },
        { 
          number: 3, 
          title: "Setting Up Your Environment", 
          description: "Tools and resources you'll need", 
          duration: "20 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Let's get your development environment ready for building AI agents. This practical tutorial will guide you through installing the necessary software, setting up your workspace, and configuring everything you need to start building.",
          resources: [
            { type: "pdf", name: "Environment Setup Guide", url: "/resources/setup-guide.pdf" },
            { type: "zip", name: "Starter Templates", url: "/resources/starter-templates.zip" },
            { type: "link", name: "Recommended Tools", url: "https://example.com/tools" }
          ]
        }
      ]
    },
    "aaa-model": {
      title: "The AAA Model",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "What is the AAA Model?", 
          description: "Understanding the AI Automation Agency model", 
          duration: "12 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "The AAA Model is revolutionizing how businesses implement AI solutions. This video breaks down what makes this model so effective and why it's becoming the standard approach for AI implementation across industries.",
          resources: [
            { type: "pdf", name: "AAA Model Overview", url: "/resources/aaa-model.pdf" },
            { type: "link", name: "Case Studies", url: "https://example.com/case-studies" }
          ]
        },
        { 
          number: 2, 
          title: "The Core Components", 
          description: "Breaking down each element of the model", 
          duration: "18 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Dive deep into the three pillars of the AAA Model. We'll examine each component in detail, showing how they work together to create a powerful framework for building and monetizing AI automation solutions.",
          resources: [
            { type: "pdf", name: "Components Reference", url: "/resources/components.pdf" },
            { type: "doc", name: "Implementation Guide", url: "/resources/implementation.docx" }
          ]
        },
        { 
          number: 3, 
          title: "Success Factors", 
          description: "Key factors that determine success with the AAA model", 
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "What separates successful AI automation agencies from those that struggle? This video reveals the critical success factors based on data from hundreds of agencies, giving you a roadmap to follow for your own implementation.",
          resources: [
            { type: "pdf", name: "Success Factors Guide", url: "/resources/success-factors.pdf" },
            { type: "xls", name: "Assessment Tool", url: "/resources/assessment.xlsx" }
          ]
        }
      ]
    },
    "success-stories": {
      title: "Success Stories",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "From Zero to Hero", 
          description: "How beginners achieved success with AI agents", 
          duration: "25 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Meet ordinary people who started with no technical background and built successful AI automation businesses. These inspiring stories show what's possible when you follow the right framework and take consistent action.",
          resources: [
            { type: "pdf", name: "Case Studies PDF", url: "/resources/case-studies.pdf" },
            { type: "link", name: "Interview Transcripts", url: "https://example.com/interviews" }
          ]
        },
        { 
          number: 2, 
          title: "Scaling to Six Figures", 
          description: "Case studies of successful agencies", 
          duration: "20 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Discover how several AI automation agencies scaled their operations to generate six-figure revenues. We break down their strategies, analyze what worked, and extract practical lessons you can apply to your own business.",
          resources: [
            { type: "pdf", name: "Growth Strategies", url: "/resources/growth-strategies.pdf" },
            { type: "xls", name: "ROI Calculator", url: "/resources/roi-calculator.xlsx" }
          ]
        },
        { 
          number: 3, 
          title: "Lessons from the Leaders", 
          description: "Key takeaways from top performers", 
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Learn from the experience of industry leaders who have pioneered AI automation solutions. This compilation of insights and advice will help you avoid common pitfalls and accelerate your path to success.",
          resources: [
            { type: "pdf", name: "Leadership Insights", url: "/resources/leadership-insights.pdf" },
            { type: "doc", name: "Implementation Checklist", url: "/resources/implementation-checklist.docx" }
          ]
        }
      ]
    },
    "mindset": {
      title: "Mindset",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "The Entrepreneur's Mindset", 
          description: "Developing the right mental approach", 
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Success with AI starts with the right mindset. This video explores the psychological foundations that successful AI entrepreneurs cultivate, helping you develop resilience, creativity, and persistence.",
          resources: [
            { type: "pdf", name: "Mindset Workbook", url: "/resources/mindset-workbook.pdf" },
            { type: "audio", name: "Guided Visualization", url: "/resources/visualization.mp3" }
          ]
        },
        { 
          number: 2, 
          title: "Overcoming Obstacles", 
          description: "Common challenges and how to solve them", 
          duration: "20 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Every entrepreneur faces obstacles on their journey. This practical guide helps you identify, anticipate, and overcome the most common challenges you'll encounter when building your AI automation business.",
          resources: [
            { type: "pdf", name: "Problem-Solving Toolkit", url: "/resources/problem-solving.pdf" },
            { type: "doc", name: "Decision-Making Framework", url: "/resources/decision-framework.docx" }
          ]
        },
        { 
          number: 3, 
          title: "Consistency and Growth", 
          description: "Building habits for sustainable success", 
          duration: "18 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Discover the power of consistent action and learn how to build sustainable habits that lead to long-term growth. This lesson includes practical techniques for maintaining momentum even when motivation fluctuates.",
          resources: [
            { type: "pdf", name: "Habit Building Guide", url: "/resources/habit-building.pdf" },
            { type: "xls", name: "Progress Tracker", url: "/resources/progress-tracker.xlsx" }
          ]
        }
      ]
    },
    "ai-foundations": {
      title: "AI Foundations",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "AI Fundamentals", 
          description: "Core concepts you need to understand", 
          duration: "22 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "This comprehensive introduction covers all the AI fundamentals you need to know. From machine learning basics to neural networks, we explain complex concepts in simple terms that anyone can understand.",
          resources: [
            { type: "pdf", name: "AI Fundamentals Guide", url: "/resources/ai-fundamentals.pdf" },
            { type: "link", name: "Interactive Demo", url: "https://example.com/demo" }
          ]
        },
        { 
          number: 2, 
          title: "Types of AI Agents", 
          description: "Different capabilities and applications", 
          duration: "18 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Explore the diverse world of AI agents and their specialized capabilities. This lesson categorizes major types of AI agents and shows how different industries are leveraging each type for specific applications.",
          resources: [
            { type: "pdf", name: "Agent Types Guide", url: "/resources/agent-types.pdf" },
            { type: "doc", name: "Industry Applications", url: "/resources/applications.docx" }
          ]
        },
        { 
          number: 3, 
          title: "Building Your First Agent", 
          description: "Step-by-step guide to get started", 
          duration: "30 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Follow along as we build a functioning AI agent from scratch. This hands-on tutorial guides you through each step, from concept to deployment, giving you the skills to create your own solutions.",
          resources: [
            { type: "pdf", name: "Build Guide", url: "/resources/build-guide.pdf" },
            { type: "zip", name: "Starter Code", url: "/resources/starter-code.zip" }
          ]
        }
      ]
    },
    "launch": {
      title: "Launch",
      progress: 0,
      lessons: [
        { 
          number: 1, 
          title: "Choosing Your Niche", 
          description: "How to identify profitable opportunities", 
          duration: "15 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Selecting the right niche is critical for your AI automation agency. This strategic guide walks you through evaluating different markets, identifying pain points, and positioning your services for maximum impact and profitability.",
          resources: [
            { type: "pdf", name: "Niche Selection Guide", url: "/resources/niche-selection.pdf" },
            { type: "xls", name: "Market Analysis Template", url: "/resources/market-analysis.xlsx" }
          ]
        },
        { 
          number: 2, 
          title: "Marketing Your Agency", 
          description: "Strategies to attract your first clients", 
          duration: "25 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Learn effective strategies to market your AI automation services and attract high-quality clients. This comprehensive marketing plan covers everything from positioning to lead generation and conversion.",
          resources: [
            { type: "pdf", name: "Marketing Playbook", url: "/resources/marketing-playbook.pdf" },
            { type: "doc", name: "Client Acquisition Plan", url: "/resources/client-acquisition.docx" }
          ]
        },
        { 
          number: 3, 
          title: "Scaling Operations", 
          description: "Systems and processes for growth", 
          duration: "20 min",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          fullDescription: "Prepare your agency for sustainable growth with scalable systems and processes. This lesson shows you how to build operational infrastructure that can support increasing client demands without sacrificing quality.",
          resources: [
            { type: "pdf", name: "Scaling Guide", url: "/resources/scaling-guide.pdf" },
            { type: "xls", name: "Capacity Planning Tool", url: "/resources/capacity-planning.xlsx" }
          ]
        }
      ]
    }
  };
  
  return modules[moduleId] || {
    title: "Module Not Found",
    progress: 0,
    lessons: []
  };
};

// Resource icon component
const ResourceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#FF5252" />
          <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z" fill="#FF5252" />
          <path d="M16 12H12V14H16V12Z" fill="white" />
          <path d="M12 10H16V8H12V10Z" fill="white" />
          <path d="M12 6H16V4H12V6Z" fill="white" />
        </svg>
      );
    case 'doc':
    case 'docx':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#4285F4" />
          <path d="M14 8V2L20 8H14Z" fill="#A1C2FA" />
          <path d="M16 13H8V15H16V13Z" fill="white" />
          <path d="M16 17H8V19H16V17Z" fill="white" />
          <path d="M10 9H8V11H10V9Z" fill="white" />
        </svg>
      );
    case 'xls':
    case 'xlsx':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#0F9D58" />
          <path d="M14 8V2L20 8H14Z" fill="#8ED1B1" />
          <path d="M10 13L8 17H10L12 13L14 17H16L14 13L16 9H14L12 13L10 9H8L10 13Z" fill="white" />
        </svg>
      );
    case 'zip':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#FF9800" />
          <path d="M14 8V2L20 8H14Z" fill="#FFCC80" />
          <path d="M10 19H14V15H10V19Z" fill="white" />
          <path d="M12 12V14H14V12H12ZM10 10V12H12V10H10ZM12 8V10H14V8H12ZM10 6V8H12V6H10Z" fill="white" />
        </svg>
      );
    case 'audio':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z" fill="#7C4DFF" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12Z" fill="#4754F0" />
          <path d="M8 13H16V11H8V13Z" fill="#4754F0" />
          <path d="M17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="#4754F0" />
        </svg>
      );
  }
};

const ClassroomModule: React.FC = () => {
  const { moduleId, randomRoute } = useParams<{ moduleId: string, randomRoute: string }>();
  const module = getModuleById(moduleId || "");
  
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  
  const toggleLesson = (lessonNumber: number) => {
    if (expandedLesson === lessonNumber) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonNumber);
    }
  };
  
  return (
    <Container>
      <Header>
        <Logo src="/assets/img/logo.png" alt="Logo" />
        <BackButton to="/classroom">← Back to Classroom</BackButton>
      </Header>
      <ContentWrapper>
        <ModuleHeader>
          <ModuleTitle>{module.title}</ModuleTitle>
          <ProgressBar>
            <Progress progress={module.progress} />
          </ProgressBar>
          <ProgressText>Progress: {module.progress}% complete</ProgressText>
        </ModuleHeader>
        
        <ModuleContent>
          {module.lessons.map(lesson => (
            <LessonCard key={lesson.number} isExpanded={expandedLesson === lesson.number}>
              <LessonHeader 
                onClick={() => toggleLesson(lesson.number)}
                isExpanded={expandedLesson === lesson.number}
              >
                <LessonNumber>{lesson.number}</LessonNumber>
                <LessonInfo>
                  <LessonTitle>{lesson.title}</LessonTitle>
                  <LessonDescription>{lesson.description}</LessonDescription>
                </LessonInfo>
                <LessonDuration>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}>
                    <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5Z" fill="#6c757d"/>
                    <path d="M8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25V8C7.25 8.41421 7.58579 8.75 8 8.75H11C11.4142 8.75 11.75 8.41421 11.75 8C11.75 7.58579 11.4142 7.25 11 7.25H8.75V4.25C8.75 3.83579 8.41421 3.5 8 3.5Z" fill="#6c757d"/>
                  </svg>
                  {lesson.duration}
                </LessonDuration>
                <ExpandIcon isExpanded={expandedLesson === lesson.number}>
                  ▼
                </ExpandIcon>
              </LessonHeader>
              
              <LessonExpandedContent isExpanded={expandedLesson === lesson.number}>
                <VideoContainer>
                  <VideoWrapper>
                    <VideoIframe 
                      src={lesson.videoUrl} 
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoWrapper>
                </VideoContainer>
                
                <ResourcesSection>
                  <ResourcesTitle>Resources</ResourcesTitle>
                  <ResourcesList>
                    {lesson.resources.map((resource, index) => (
                      <ResourceItem key={index} href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ResourceIcon type={resource.type} />
                        {resource.name}
                      </ResourceItem>
                    ))}
                  </ResourcesList>
                </ResourcesSection>
                
                <FullDescription>
                  <DescriptionTitle>About This Lesson</DescriptionTitle>
                  <DescriptionText>
                    {lesson.fullDescription}
                  </DescriptionText>
                </FullDescription>
              </LessonExpandedContent>
            </LessonCard>
          ))}
        </ModuleContent>
      </ContentWrapper>
    </Container>
  );
};

export default ClassroomModule; 