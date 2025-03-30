import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeForm, { ResumeData } from './ResumeForm';
import ResumeTemplate from './ResumeTemplate';

const App: React.FC = () => {
  // Shared resume data state (initially null)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ResumeForm onSubmit={(data) => setResumeData(data)} />}
        />
        <Route
          path="/resume-print"
          element={
            resumeData ? (
              <ResumeTemplate data={resumeData} />
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                Please fill out the resume form first.
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;