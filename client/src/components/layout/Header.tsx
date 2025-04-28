import {
  UserGroupIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <header className="bg-surface border-b border-gray-200/80 sticky top-0 z-10 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                HubSpot Contact Viewer
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your contacts efficiently
              </p>
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
  );
};
