import { useState } from "react";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateQuoteModal from "./CreateQuoteModal";

export default function Topbar({ onMenuToggle }) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="h-16 border-b border-dark-800/60 bg-dark-900/60 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8">
        {/* Left: Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-dark-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="text"
              placeholder="Search requests, quotes..."
              className="w-full bg-dark-800/50 border border-dark-700/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-dark-200 placeholder:text-dark-500 focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/10 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQuoteModal(true)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Quote</span>
          </button>

          <button className="relative p-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800/60 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:shadow-lg hover:shadow-accent-500/20 transition-all">
            SA
          </div>
        </div>
      </header>

      <CreateQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />
    </>
  );
}
