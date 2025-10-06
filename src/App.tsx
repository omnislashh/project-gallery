import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from "./pages/AdminLogin";
import ProjectPage from './pages/ProjectPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Adjust the path if your firebase config is elsewhere

function ProtectedAdmin() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  return user ? <Admin /> : <AdminLogin />;
}

function App() {
  return (
    <ProjectsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
        </Routes>
      </Router>
    </ProjectsProvider>
  );
}

export default App;
// import TestAddProject from "./components/TestAddProject";

// function App() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">🚀 Firebase Test</h1>
//       <TestAddProject />
//     </div>
//   );
// }

// export default App;
