interface QuickActionsProps {
  onAddContact: () => void;
}

const QuickActions = ({ onAddContact }: QuickActionsProps) => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-200/80 p-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <button
          className="btn btn-primary w-full text-sm"
          onClick={onAddContact}
        >
          Add New Contact
        </button>
        <button className="btn btn-outline w-full text-sm">
          Import Contacts
        </button>
        <button className="btn btn-outline w-full text-sm">Export List</button>
      </div>
    </div>
  );
};

export default QuickActions;
