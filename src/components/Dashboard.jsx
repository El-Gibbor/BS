import React from 'react';
import { useAuth } from './auth/AuthContext';
import { User, GraduationCap, Calendar, MessageSquare, Star, Clock, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src="/alu-logo-main.png"
                alt="ALU Logo"
                className="w-10 h-6 object-contain"
              />
              <h1 className="text-xl font-bold text-gray-900">StudyBuddy Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.canOfferHelp ? (
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                ) : (
                  <User className="w-5 h-5 text-blue-600" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user?.fullName}
                </span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                  {user?.canOfferHelp ? 'Helper' : 'Student'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.fullName}! 👋
          </h2>
          <p className="text-blue-100">
            {user?.canOfferHelp
              ? "Ready to help fellow students succeed today?"
              : "Let's find the perfect study buddy for your learning journey!"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sessions This Week</p>
                <p className="text-2xl font-bold text-gray-900">{user?.canOfferHelp ? '5' : '3'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Chats</p>
                <p className="text-2xl font-bold text-gray-900">{user?.canOfferHelp ? '8' : '2'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.rating ? `${user.rating}/5` : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Helped</p>
                <p className="text-2xl font-bold text-gray-900">{user?.totalHours || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-sm text-gray-900">{user?.email}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">University:</span>
                <span className="ml-2 text-sm text-gray-900">{user?.university}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Year:</span>
                <span className="ml-2 text-sm text-gray-900">{user?.yearOfStudy}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Major:</span>
                <span className="ml-2 text-sm text-gray-900">{user?.major}</span>
              </div>
              {user?.canOfferHelp && user?.modules && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Skills:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {user.modules.map((module, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {!user?.canOfferHelp ? (
                <>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Find a Study Buddy</div>
                    <div className="text-sm text-gray-600">Search for help with specific subjects</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Create Support Ticket</div>
                    <div className="text-sm text-gray-600">Get help with academic challenges</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Browse Study Groups</div>
                    <div className="text-sm text-gray-600">Join collaborative learning sessions</div>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">View Support Requests</div>
                    <div className="text-sm text-gray-600">Help students with their questions</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Manage Availability</div>
                    <div className="text-sm text-gray-600">Update your schedule and rates</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Create Study Group</div>
                    <div className="text-sm text-gray-600">Start a collaborative learning session</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {user?.canOfferHelp ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Completed session with Sarah M.</p>
                    <p className="text-xs text-gray-500">Mathematics tutoring - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New booking request from Mike K.</p>
                    <p className="text-xs text-gray-500">Business Strategy help - 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Received 5-star rating from Emma L.</p>
                    <p className="text-xs text-gray-500">Data Analysis session - 1 day ago</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Session confirmed with Alex R.</p>
                    <p className="text-xs text-gray-500">Programming help - Tomorrow 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Support ticket resolved</p>
                    <p className="text-xs text-gray-500">Statistics homework help - 3 hours ago</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
