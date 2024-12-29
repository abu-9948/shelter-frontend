import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
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

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-lime-600 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <HomePage />
              } />
              <Route path="/about" element={
                <AboutPage />
              } />
              <Route path="/signin" element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              } />
              <Route path="/reset-password/:token" element={
                <PublicRoute>
                  <ResetPasswordPage />
                </PublicRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/post-accommodation" element={
                <ProtectedRoute>
                  <PostAccommodation />
                </ProtectedRoute>
              } />
              <Route path="manage-accommodations" element={
                <ProtectedRoute>
                  <ManageAccommodations />
                </ProtectedRoute>
              } />
              <Route path="/manage-accommodation/:id" element={
                <ProtectedRoute>
                  <EditAccommodation />
                </ProtectedRoute>
              } />
              
              <Route path="/accommodations" element={
                <ProtectedRoute>
                  <AccommodationsPage />
                </ProtectedRoute>
              } />
              <Route path="/accommodations/:id" element={
                <ProtectedRoute>
                  <AccommodationDetails />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;