import { Outlet, NavLink } from "react-router";
import { Home, Calendar, MessageSquare, Bell, User } from "lucide-react";

export function MainLayout() {
  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full h-[80px] bg-white border-t border-gray-100 flex items-center justify-around px-4 pb-4 pt-2 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        <NavItem to="/app" icon={Home} label="Home" end />
        <NavItem to="/app/appointments" icon={Calendar} label="Visits" />
        <NavItem to="/app/messages" icon={MessageSquare} label="Messages" badge />
        <NavItem to="/app/notifications" icon={Bell} label="Alerts" badge />
        <NavItem to="/app/profile" icon={User} label="Profile" />
      </div>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, badge, end }: any) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-14 gap-1 relative ${
          isActive ? "text-[#1A73E8]" : "text-gray-400"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isActive ? "bg-blue-50" : ""}`}>
            <Icon
              className="w-[22px] h-[22px]"
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            {badge && !isActive && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <span className={`text-[10px] font-semibold ${isActive ? "text-[#1A73E8]" : "text-gray-400"}`}>{label}</span>
        </>
      )}
    </NavLink>
  );
}
