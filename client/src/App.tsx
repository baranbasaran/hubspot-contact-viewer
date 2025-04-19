import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactList from './components/ContactList';
import CreateContactForm from './components/CreateContactForm';
import { 
  UserGroupIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import './styles.css'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen w-full bg-background">
          <header className="bg-surface border-b border-gray-200/80 sticky top-0 z-10 w-full">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">HubSpot Contact Viewer</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your contacts efficiently</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="btn btn-outline">
                    <BellIcon className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="btn btn-outline">
                    <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="w-full">
            <div className="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
                    <div className="border-b border-gray-200/80 bg-gray-50/50 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">Contact Management</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            View, search, and manage your HubSpot contacts in one place
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="btn btn-primary inline-flex items-center"
                          >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Contact
                          </button>
                          <span className="badge badge-primary">
                            HubSpot Connected
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <ContactList />
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-80 space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">Total Contacts</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ChartBarIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">Active Deals</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">0</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Contact <span className="font-medium text-gray-900">John Doe</span> was updated</p>
                          <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">New contact <span className="font-medium text-gray-900">Jane Smith</span> added</p>
                          <p className="text-xs text-gray-500 mt-0.5">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-outline w-full mt-4 text-sm">View All Activity</button>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        className="btn btn-primary w-full text-sm"
                        onClick={() => setIsCreateModalOpen(true)}
                      >
                        Add New Contact
                      </button>
                      <button className="btn btn-outline w-full text-sm">Import Contacts</button>
                      <button className="btn btn-outline w-full text-sm">Export List</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Create Contact Modal */}
          <CreateContactForm
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </div>
      </QueryClientProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
