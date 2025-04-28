import { ClockIcon } from "@heroicons/react/24/outline";

const RecentActivity = () => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 p-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">
              Contact{" "}
              <span className="font-medium text-gray-900">John Doe</span> was
              updated
            </p>
            <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">
              New contact{" "}
              <span className="font-medium text-gray-900">Jane Smith</span>{" "}
              added
            </p>
            <p className="text-xs text-gray-500 mt-0.5">5 hours ago</p>
          </div>
        </div>
      </div>
      <button className="btn btn-outline w-full mt-4 text-sm">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
