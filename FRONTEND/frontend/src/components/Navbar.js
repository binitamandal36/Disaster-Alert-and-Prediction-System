import { Link, NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const base =
    "text-sm md:text-[15px] text-slate-300 hover:text-white transition";

  const active =
    "text-sm md:text-[15px] text-white font-semibold border-b-2 border-amber-400 pb-0.5";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">
            ⚠
          </div>
          <span className="text-lg font-bold text-white tracking-wide">
            Disaster Alert
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/" className={({isActive}) => isActive ? active : base}>
            Home
          </NavLink>

          <NavLink to="/disasters" className={({isActive}) => isActive ? active : base}>
            Disasters
          </NavLink>

          <NavLink to="/alerts" className={({isActive}) => isActive ? active : base}>
            Alerts
          </NavLink>

          <NavLink to="/map" className={({isActive}) => isActive ? active : base}>
            Map
          </NavLink>

          <NavLink to="/about" className={({isActive}) => isActive ? active : base}>
            About
          </NavLink>

          <NavLink to="/contact" className={({isActive}) => isActive ? active : base}>
            Contact
          </NavLink>

          {/* Map Button */}
          <Link
            to="/map"
            className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition"
          >
            Live Map
          </Link>

          {/* Admin */}
          <NavLink
            to="/admin/login"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg transition"
          >
            Admin
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;