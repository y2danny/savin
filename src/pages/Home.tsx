import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersRound, Landmark, Bell, BarChart, Share2, Shield, Users, Wallet, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAjoStore } from '../store/ajoStore';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCreateClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/create');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-700 to-purple-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Modern Rotating Savings for Everyone
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-8">
                AjoSave brings the traditional rotating savings concept into the digital age. 
                Create or join a group, contribute regularly, and receive your payout when it's your turn.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-700 to-purple-400 text-white shadow-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-xl transform hover:-translate-y-0.5 transition"
                  onClick={handleCreateClick}
                  icon={<UsersRound size={20} />}
                >
                  Create an Ajo
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-400 text-purple-700 bg-white hover:bg-purple-50 hover:text-purple-900 hover:border-purple-700 transition"
                  onClick={() => {
                    if (!user) {
                      setShowAuthModal(true);
                    } else {
                      navigate('/join');
                    }
                  }}
                  icon={<Landmark size={20} />}
                >
                  Join an Ajo
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 hidden lg:block">
              {/* Placeholder for illustration/image */}
              <div className="bg-purple-600 bg-opacity-30 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <UsersRound size={120} className="mx-auto opacity-80" />
                  <p className="mt-4 text-lg font-medium text-purple-100">Collaborative Savings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-gray-200" />

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Savin Works
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              A simple, transparent approach to community savings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create or Join</h3>
              <p className="text-gray-600">
                Start your own Ajo group or join an existing one using a group code.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Make Contributions</h3>
              <p className="text-gray-600">
                Contribute a fixed amount at regular intervals (weekly, biweekly, or monthly).
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive Payouts</h3>
              <p className="text-gray-600">
                When it's your turn, receive the full pot from all members' contributions in Naira, Solana or USDT.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200" />

      {/* Why Savin Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-purple-900 sm:text-4xl">
              Digital Ajo
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Experience the benefits of digital rotating savings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Missed Turns</h3>
              <p className="text-gray-600">
                Automated scheduling ensures everyone gets their turn at the right time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-tracking</h3>
              <p className="text-gray-600">
                Keep track of all contributions and payouts automatically.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Share2 size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Invites</h3>
              <p className="text-gray-600">
                Invite members to your group with a simple shareable link.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Bell size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Built-in Reminders</h3>
              <p className="text-gray-600">
                Never miss a contribution with automated payment reminders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-gray-200" />

      {/* Trust Metrics Section */}
      <div className="py-16 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              100% Trust & Reliability
            </h2>
            <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
              Join thousands of satisfied users saving together
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-800 rounded-full mb-4">
                <Wallet size={32} className="text-purple-200" />
              </div>
              <div className="text-4xl font-bold mb-2">₦3.2M+</div>
              <p className="text-purple-200">Total Amount Rotated</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-800 rounded-full mb-4">
                <Users size={32} className="text-purple-200" />
              </div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-purple-200">Active Members</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-800 rounded-full mb-4">
                <CheckCircle size={32} className="text-purple-200" />
              </div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-purple-200">Payout Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-12 border-t border-gray-200" />

      {/* Mini FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Questions? 💡
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Common questions about AjoSave
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Is my money safe?",
                answer: "Yes! We use bank-level security and encryption. All transactions are processed through licensed payment partners, and we maintain strict security protocols to protect your funds."
              },
              {
                question: "Can I leave a group early?",
                answer: "While we encourage members to complete their rotation cycle, you can request to leave a group. However, this is subject to group policy and may affect your ability to receive pending payouts."
              },
              {
                question: "What happens if someone doesn't pay?",
                answer: "We have multiple safeguards in place: mandatory security deposits, automated payment tracking, and a strict vetting process. In the rare case of default, our guarantee fund helps protect other members."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  className="w-full flex justify-between items-center p-4 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;