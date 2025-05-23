import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.tsx'; // Import the new Home component
import Signup from './components/Signup.tsx'; // Import your Signup component
import TermsAndPolicy from './components/TermsAndPolicy.tsx'; // Import Terms and Policy component
import CapabilityPage from './components/capabilities/CapabilityPage';
import { omniChatData, phoneCallsData, toolsData } from './data/capabilityData';
import Classroom from './components/Classroom.tsx'; // Import the new Classroom component
import ClassroomModule from './components/ClassroomModule.tsx'; // Import the ClassroomModule component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/terms-and-policy" element={<TermsAndPolicy />} />
                
                {/* Capability routes - Using the template with different data */}
                <Route path="/capabilities/omni-chat" element={<CapabilityPage data={omniChatData} />} />
                <Route path="/capabilities/phone-calls" element={<CapabilityPage data={phoneCallsData} />} />
                <Route path="/capabilities/tools" element={<CapabilityPage data={toolsData} />} />
                
                {/* Classroom routes */}
                <Route path="/classroom" element={<Classroom />} />
                <Route path="/classroom/:moduleId/:randomRoute" element={<ClassroomModule />} />
            </Routes>
        </Router>
    );
};

export default App;