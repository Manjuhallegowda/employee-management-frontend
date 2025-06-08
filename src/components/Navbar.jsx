import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiLogout } from 'react-icons/hi';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const linkClass = ({ isActive }) =>
    `block px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive
        ? 'bg-blue-600 text-white shadow-[0_4px_6px_rgba(59,130,246,0.4)]'
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
        {/* Logo area */}
        <NavLink to="/dashboard" className="flex items-center space-x-3 cursor-pointer select-none">
        <div className="flex items-center space-x-3">
          {/* Uncomment if you want to add logo image */}
          {/* <img src="/path-to-logo.svg" alt="Logo" className="h-8 w-auto" /> */}
          <h1 className="text-2xl font-extrabold text-gray-800 select-none tracking-wide">
            Employee Management
          </h1>
        </div></NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>
          <NavLink to="/add-employee" className={linkClass}>
            Add Employee
          </NavLink>
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
          >
            <HiLogout size={20} />
            Logout
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/employees"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Employees
          </NavLink>
          <NavLink
            to="/add-employee"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Add Employee
          </NavLink>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 w-full justify-center bg-red-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 font-semibold"
          >
            <HiLogout size={20} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}