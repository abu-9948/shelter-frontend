import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-lime-600 mb-4">404</h1>
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
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;