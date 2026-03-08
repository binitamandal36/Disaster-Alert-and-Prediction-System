import { Link, NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const linkBase =
    "text-sm md:text-[15px] text-slate-200 hover:text-amber-300 transition-colors";
  const linkActive =
    "text-sm md:text-[15px] text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-white tracking-tight"
        >
          Disaster Alert System
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Home
          </NavLink>
          <NavLink
            to="/disasters"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Disasters
          </NavLink>
          <NavLink
            to="/alerts"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Alerts
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? linkActive : linkBase)}
          >
            Contact
          </NavLink>
          <Link
  to="/map"
  className="bg-emerald-600 hover:bg-emerald-700 px-7 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg transition"
>
  View Disaster Map
</Link>
          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              isActive
                ? "text-sm md:text-[15px] text-white font-semibold bg-red-600 px-4 py-1.5 rounded-full shadow-md shadow-red-600/40"
                : "text-sm md:text-[15px] text-white bg-red-500/90 hover:bg-red-600 px-4 py-1.5 rounded-full shadow-md shadow-red-600/30"
            }
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
