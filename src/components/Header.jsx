// src/components/Header.jsx
import { useContext, useState, useEffect } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserRole(res.data?.role); // role can be "admin", "volunteer", or "donor"
      });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    // DaisyUI theme toggle
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    // Optional: also toggle Tailwind dark mode if configured with 'class'
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Donation Requests", path: "/available-requests" },
    { name: "Blog", path: "/blogs" },
  ];

  const donorLinks = [
    { name: "Donation Request", path: "/donation-request" },
    { name: "My Requests", path: "/my-requests" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Funding", path: "/funding" },
  ];

  const handleLogout = () => {
    logOut();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-red-600 shadow-sm sticky top-0 z-50">
      {user && (
        <p className="text-center text-white bg-black py-2 bg-opacity-90">
          Welcome, {user?.displayName} 💨
        </p>
      )}
      {/* Navbar Container */}
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center relative">
        <Link to="/" className="logo text-2xl font-bold text-white">
          BloodConnect
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-white">
          {commonLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-black font-medium"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {(user && (userRole === "admin" || userRole === "volunteer")) && (
            <NavLink
              to="/dashboard/content-management"
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-black font-medium"
              }
            >
              Content Management
            </NavLink>
          )}

          {user?.email ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-black font-medium"
                }
              >
                Dashboard
              </NavLink>

              {/* Theme Toggle (Desktop) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
              >
                {theme === "light" ? (
                  <FiMoon className="text-xl" />
                ) : (
                  <FiSun className="text-xl" />
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-white/10 transition"
                  aria-label="Open user menu"
                >
                  <FaUserCircle className="text-2xl text-white" />
                </button>
                {isDropdownOpen && (
                  <ul
                    className="absolute top-10 right-0 w-48 bg-red-600 text-white shadow-lg rounded-xl overflow-hidden border border-white/10"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {donorLinks.slice(0, 3).map((item) => (
                      <li key={item.path} className="border-b border-white/10 last:border-b-0">
                        <NavLink
                          to={item.path}
                          className="block px-4 py-2 hover:bg-red-700 transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-700 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Theme Toggle (Desktop when logged out) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
              >
                {theme === "light" ? (
                  <FiMoon className="text-xl" />
                ) : (
                  <FiSun className="text-xl" />
                )}
              </button>

              <NavLink to="/login" className="hover:text-black font-medium">
                Login
              </NavLink>
              <NavLink to="/registration" className="hover:text-black font-medium">
                Register
              </NavLink>
            </>
          )}
        </ul>

        {/* Mobile Actions (theme + menu icon) */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
          >
            {theme === "light" ? (
              <FiMoon className="text-xl" />
            ) : (
              <FiSun className="text-xl" />
            )}
          </button>

          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl cursor-pointer text-white"
              aria-label="Open menu"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer text-white"
              aria-label="Close menu"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col gap-2 p-4 bg-red-600 shadow-md text-white z-50">
          {commonLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="px-2 py-2 rounded-md hover:bg-red-700 transition"
            >
              {item.name}
            </NavLink>
          ))}

          {(user && (userRole === "admin" || userRole === "volunteer")) && (
            <NavLink
              to="/dashboard/content-management"
              onClick={() => setIsMenuOpen(false)}
              className="px-2 py-2 rounded-md hover:bg-red-700 transition"
            >
              Content Management
            </NavLink>
          )}

          {user?.email ? (
            <>
              {donorLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-2 py-2 rounded-md hover:bg-red-700 transition"
                >
                  {item.name}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-left px-2 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-2 py-2 rounded-md hover:bg-red-700 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/registration"
                onClick={() => setIsMenuOpen(false)}
                className="px-2 py-2 rounded-md hover:bg-red-700 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
