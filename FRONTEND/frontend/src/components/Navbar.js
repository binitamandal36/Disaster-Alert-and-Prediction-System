import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const baseLinkClass = "hover:text-yellow-300";
  const activeLinkClass = "text-yellow-400 font-semibold";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-xl font-bold">
          Disaster Alert System
        </Link>

        {/* Navigation Links - public can only view data */}
        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/disasters"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
            }
          >
            Disasters
          </NavLink>

          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
            }
          >
            Alerts
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              isActive ? activeLinkClass : baseLinkClass
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
