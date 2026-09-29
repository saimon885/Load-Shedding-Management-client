import { UseLogOutHook } from "@/hooks/auth.hook";
import { LogOut } from "lucide-react";

import React from "react";

const LogOutUser = () => {
  const { mutate: logout, isPending } = UseLogOutHook();
  const handleLogout = () => {
    // setIsDropdownOpen(false);
    // setIsMobileMenuOpen(false);
    // TODO: apni apnar logout logic ekhane boshan
    logout();
  };
  return (
    <div>
      <button
        type="button"
        role="menuitem"
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
      >
        <LogOut size={16} />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default LogOutUser;
