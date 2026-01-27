import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold">
          Disaster Alert System
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="hover:text-indigo-200 transition"
          >
            Home
          </Link>

          <Link
            to="/disasters"
            className="hover:text-indigo-200 transition"
          >
            Disasters
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
