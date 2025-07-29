// src/components/Header.jsx
import { useContext, useState, useEffect } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserRole(res.data?.role); // role can be "admin", "volunteer", or "donor"
      });
    }
  }, [user?.email, axiosSecure]);

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
    <nav className="overflow-x-clip bg-white shadow-sm sticky top-0 z-50">
      {user && (
        <p className="text-center text-white bg-black py-2 bg-opacity-90">
          Welcome, {user?.displayName} 💨
        </p>
      )}
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center relative">
        <Link to="/" className="logo text-2xl font-bold text-red-600">
          BloodConnect
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-700">
          {commonLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "hover:text-red-500 font-medium"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {(user && (userRole === "admin" || userRole === "volunteer")) && (
            <NavLink
              to="/dashboard/content-management"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-semibold" : "hover:text-red-500 font-medium"
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
                  isActive ? "text-red-500 font-semibold" : "hover:text-red-500 font-medium"
                }
              >
                Dashboard
              </NavLink>
              <div className="relative">
                <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
                  <FaUserCircle className="text-2xl text-red-500" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-10 right-0 bg-white shadow rounded w-40 z-50 text-left">
                    {donorLinks.slice(0, 3).map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
              <NavLink to="/login" className="hover:text-red-500 font-medium">
                Login
              </NavLink>
              <NavLink to="/registration" className="hover:text-red-500 font-medium">
                Register
              </NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col gap-4 p-4 bg-white shadow-md text-gray-700 z-50">
          {commonLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-red-500"
            >
              {item.name}
            </NavLink>
          ))}

          {(user && (userRole === "admin" || userRole === "volunteer")) && (
            <NavLink
              to="/dashboard/content-management"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-red-500"
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
                  className="hover:text-red-500"
                >
                  {item.name}
                </NavLink>
              ))}
              <button onClick={handleLogout} className="text-left hover:text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/registration" onClick={() => setIsMenuOpen(false)}>
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
