import { PlusIcon } from "@heroicons/react/24/outline";
import ContactList from "../ContactList";

interface MainContentProps {
  onAddContact: () => void;
}

const MainContent = ({ onAddContact }: MainContentProps) => {
  return (
    <div className="flex-1">
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
        <div className="border-b border-gray-200/80 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact Management
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View, search, and manage your HubSpot contacts in one place
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onAddContact}
                className="btn btn-primary inline-flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Contact
              </button>
              <span className="badge badge-primary">HubSpot Connected</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
