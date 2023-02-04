import React, { useContext, useState } from "react";
import { BiHealth } from "react-icons/bi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { auth } from "../../utils/firbase";
import HamburgerMenu from "../UI/HamburgerMenu";
import Sidebar from "./Sidebar";

type Props = {};

const Navbar = (props: Props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const { user } = useContext(AuthContext);

  const admin = user?.email === "bayoji7@gmail.com";
  //   Toggle sideDrawer
  const toggleDrawer = () => {
    setShowSideDrawer((prev) => !prev);
  };

  const logOutHandler = () => {
    auth.signOut();
  };

  // active Navlink Style
  const activeClassName = "pb-[5px] border-b-[3px] border-b-black";

  // inactive Navlink Style
  const navStyle =
    " pb-2  border-b-2 border-transparent  link-underline link-underline-black ";
  return (
    <>
      <Sidebar
        open={showSideDrawer}
        toggle={toggleDrawer}
        show={showSideDrawer}
      />
      <nav
        className={`fixed top-0 bg-white  w-full flex justify-between items-center px-6 py-3 duration-500 z-[100]`}
      >
        <header>
          <Link className="flex justify-start items-center gap-x-2" to="/">
            <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
            <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
          </Link>{" "}
        </header>
        <ul className="hidden md:flex gap-x-4 font-semibold uppercase">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClassName : navStyle
              }
              to="/gallery"
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClassName : navStyle
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          {admin && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : navStyle
                }
                to="/overview"
              >
                Overview
              </NavLink>
            </li>
          )}
        </ul>

        <button
          onClick={logOutHandler}
          className="hidden md:block text-white w-fit bg-black rounded-3xl py-2 px-3 hover:bg-black/80 duration-500"
        >
          Sign Out
        </button>
        <HamburgerMenu toggle={toggleDrawer} open={showSideDrawer} />
      </nav>
    </>
  );
};

export default Navbar;
