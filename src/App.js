import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RouteWrapper } from './components/RouteWrapper';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import PostAccommodation from './pages/PostAccommodation';
import ManageAccommodations from './pages/ManageAccommodations';
import EditAccommodation from './pages/EditAccommodation';
import AccommodationsPage from './pages/AccommodationsPage';
import AboutPage from './pages/AboutPage';
import AccommodationDetails from './pages/AccommodationDetails';
import Footer from './components/Footer';
import Documentation from './pages/Documentation';

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#6366F1] mb-4">404</h1>
        <p className="text-gray-600 mb-4">Page not found</p>
      </div>
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <RouteWrapper title="Home">
                  <HomePage />
                </RouteWrapper>
              } />
              <Route path="/about" element={
                <RouteWrapper title="About Us">
                  <AboutPage />
                </RouteWrapper>
              } />
              <Route path="/signin" element={
                <RouteWrapper title="Sign In" isPublicOnly>
                    <SignInPage />
                </RouteWrapper>
              } />
              <Route path="/signup" element={
                <RouteWrapper title="Sign Up" isPublicOnly>
                    <SignUpPage />
                </RouteWrapper>
              } />
              <Route path="/reset-password/:token" element={
                <RouteWrapper title="Reset Password" isPublicOnly>
                    <ResetPasswordPage />
                </RouteWrapper>
              } />
              <Route path="/profile" element={
                <RouteWrapper title="Profile" requireAuth>
                    <ProfilePage />
                </RouteWrapper>
              } />
              <Route path="/post-accommodation" element={
                <RouteWrapper title="Post Accommodation" requireAuth>
                    <PostAccommodation />
                </RouteWrapper>
              } />
              <Route path="manage-accommodations" element={
                <RouteWrapper title="Manage Accommodations" requireAuth>
                    <ManageAccommodations />
                </RouteWrapper>
              } />
              <Route path="/manage-accommodation/:id" element={
                <RouteWrapper title="Edit Accommodation" requireAuth>
                    <EditAccommodation />
                </RouteWrapper>
              } />
              <Route path="/accommodations" element={
                <RouteWrapper title="Accommodations" requireAuth>
                    <AccommodationsPage />
                </RouteWrapper>
              } />
              <Route path="/accommodations/:id" element={
                <RouteWrapper title="Accommodation Details" requireAuth>
                    <AccommodationDetails />
                </RouteWrapper>
              } />
              <Route path="/documentation" element={
                <RouteWrapper title="Documentation">
                    <Documentation />
                </RouteWrapper>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;