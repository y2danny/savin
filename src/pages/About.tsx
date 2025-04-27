import React from 'react';
import { Shield, Target, Users, Award, Heart, Globe2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  React.useEffect(() => {
    console.log('About page mounted');
  }, []);
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-700 to-purple-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              About Savin
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
              Revolutionizing traditional rotating savings with modern technology while preserving 
              the cultural essence of community savings.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At AjoSave, we're bridging traditional community savings with modern technology. 
                Our platform makes rotating savings groups (Ajo) accessible, secure, and efficient 
                for everyone, anywhere.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Purpose-Driven</h3>
                    <p className="mt-2 text-gray-600">Empowering financial collaboration</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Community First</h3>
                    <p className="mt-2 text-gray-600">Building trust through transparency</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-purple-100 rounded-lg p-8 flex items-center justify-center">
                <Globe2 size={200} className="text-purple-600 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Security First</h3>
              <p className="text-gray-600">
                Your trust and security are our top priorities. We employ bank-level encryption 
                and multiple security layers to protect your funds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Focused</h3>
              <p className="text-gray-600">
                We believe in the power of community savings to create opportunities and 
                foster financial growth together.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from user experience 
                to customer support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-8">
            Ready to Start Your Savings Journey?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-white text-white bg-opacity-10 hover:bg-opacity-20 border-white border-opacity-20"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2025 Savin. Built with 💜. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;