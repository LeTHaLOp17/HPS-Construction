import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Topbar from './Components/Topbar';
import About from './Pages/About';
import Home from './Pages/home'; // Home page
import Contact from './Pages/contact';
import ScrollToTop from './Components/ScrollToTop';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('Route Error Caught:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - redirect to home instead of showing error
      window.location.href = '/';
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif' 
        }}>
          <h2>🔄 Redirecting to home page...</h2>
          <p>Something went wrong. You'll be redirected automatically.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <div className="app">
            <Topbar />
            <ScrollToTop />
            <main className="main-content">
              <Routes>
                {/* Homepage ("/") */}
                <Route 
                  path="/" 
                  element={<Home key="home" />} 
                />
                
                {/* About page ("/about") */}
                <Route 
                  path="/about" 
                  element={<About key="about" />} 
                />
                
                {/* Contact page */}
                <Route 
                  path="/contact" 
                  element={<Contact key="contact" />} 
                />
                
                {/* Improved fallback route using Navigate for better routing behavior */}
                <Route 
                  path="*" 
                  element={<Navigate to="/" replace />} 
                />
              </Routes>
            </main>
          </div>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}

export default App;
