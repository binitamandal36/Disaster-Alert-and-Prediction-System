import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link className="text-xl font-bold">
          Disaster Alert System
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
              ?"text-yellow-400 font-semibold"
              :"hover:text-yellow-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/disasters"
            className={({ isActive }) =>
              isActive
              ?"text-yellow-400 font-semibold"
              :"hover:text-yellow-300"
          }          
          >
            Disasters
          </NavLink>

          <NavLink
            to="/prediction"
            className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-300"
  }
>
  Prediction
</NavLink>

<Link to="/alerts" className="hover:text-yellow-300">
  Alerts
</Link>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
