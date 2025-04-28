import { UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const QuickStats = () => {
  return (
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
  );
};

export default QuickStats;
