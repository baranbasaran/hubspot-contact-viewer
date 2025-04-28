import QuickStats from "../dashboard/QuickStats";
import RecentActivity from "../dashboard/RecentActivity";
import QuickActions from "../dashboard/QuickActions";

interface SidebarProps {
  onAddContact: () => void;
}

const Sidebar = ({ onAddContact }: SidebarProps) => {
  return (
    <div className="w-80 space-y-6">
      <QuickStats />
      <RecentActivity />
      <QuickActions onAddContact={onAddContact} />
    </div>
  );
};

export default Sidebar;
