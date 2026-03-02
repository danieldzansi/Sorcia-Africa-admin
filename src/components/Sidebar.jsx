import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PackageSearch,
  FileText,
  CreditCard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

const LOGO_URL = "https://res.cloudinary.com/dpbb0exnp/image/upload/v1772459059/5848267812768517528_rogh7m.jpg";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/requests", label: "Product Requests", icon: PackageSearch },
  { to: "/quotations", label: "Quotations", icon: FileText },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] border-r border-dark-800/60 bg-dark-900/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Sorcia Africa" className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Sorcia
            </h1>
            <p className="text-[11px] text-dark-500 font-medium tracking-widest uppercase">
              Africa
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={isActive ? "sidebar-link-active" : "sidebar-link"}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-dark-800/60">
        <button
          onClick={logout}
          className="sidebar-link w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/5"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
