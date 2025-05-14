import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from "@civic/auth-web3/react";
import { useAjoStore } from '../store/ajoStore';
import { User } from 'lucide-react';
import Button from './ui/Button';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user: civicUser, signIn, signOut } = useUser();
  const { setAuthenticated } = useAjoStore();

  const handleSignIn = async () => {
    try {
      await signIn();
      setAuthenticated(true);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAuthenticated(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-24 w-auto"
              />
            </Link>

            {/* Centered Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-12 absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-purple-500"
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={scrollToFeatures}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-purple-500"
              >
                How It Works
              </a>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-purple-500"
              >
                About
              </Link>
            </div>

            {/* Replace Lucide icons with text buttons */}
            <div className="hidden sm:flex sm:items-center">
              {!civicUser ? (
                <Button onClick={handleSignIn}>
                  Sign In
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-500 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => {
                scrollToFeatures(e);
                setMobileMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-500 hover:text-gray-900"
            >
              How It Works
            </a>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-500 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="px-4 py-2">
              {!civicUser ? (
                <Button
                  fullWidth
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="outline"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;