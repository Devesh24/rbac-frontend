import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../Hooks/auth";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";

const Navbar = ({ userType = "User" }) => {
  const { logout, cookies } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    cookies.token || userType === "Student"
      ? setLoggedIn(true)
      : setLoggedIn(false);
  }, [userType, cookies]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const [conf] = await AlertConfirm("Are you sure you want to LogOut?");

      if (conf) {
        logout();
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };
  return (
    <>
      <nav className="sticky-top">
      <p className="logo_heading">Saraswati Public School</p>
        <div className="group">
          <div className="btnGroup">
            {!loggedIn && !cookies.token && (
              <Link to="/login" className="loginBtn">
                Login
              </Link>
            )}
            {(cookies.token || loggedIn) && (
              <div
                className="logoutBtn"
                title="Logout"
                onClick={handleLogOut}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Logout"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
            )}
            {cookies.token && (
              <div className="logoutBtn" title="Dashboard">
                <Link to="/dashboard">
                  <i className="fa-solid fa-table-columns"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
