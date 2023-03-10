import React, { useContext } from "react";
import { BiHealth } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import { auth } from "../../utils/firbase";
import PrimaryButton from "../Button/PrimaryButton";
import Modal from "../UI/Modal";

type Props = {
  open: boolean;
  toggle: () => any;
  show: boolean;
};

const Sidebar = (props: Props) => {
  const { admin } = useContext(AuthContext);

  return (
    <Modal onClose={props.toggle} show={props.show}>
      <aside
        className={`z-10 fixed top-0 left-0 w-3/4 md:w-2/4 h-screen -translate-x-full bg-black flex flex-col overflow-hidden ${
          props.open
            ? `translate-x-0 transform transition duration-300 ease-in-out`
            : `-translate-x-full transform transition duration-300 ease-in-out`
        }`}
      >
        <div className="grid grid-rows-[1fr_auto] h-full py-5">
          <div>
            <header
              className={!props.open ? "hidden" : "block text-white ml-7"}
            >
              <Link className="flex justify-start items-center gap-x-2" to="/">
                <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
                <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
              </Link>{" "}
            </header>
            <ul className=" lg:hidden items-start justify-between mt-6 pl-7 text-white">
              <li className="my-4">
                <NavLink onClick={props.toggle} to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li className="my-4">
                <NavLink onClick={props.toggle} to="/contact">
                  Contact
                </NavLink>
              </li>
              {admin && (
                <li className="my-4">
                  <NavLink onClick={props.toggle} to="/overview">
                    Overview
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <button
            onClick={() => auth.signOut()}
            className="text-white w-full bg-black rounded-3xl py-3 hover:bg-black/80 duration-500"
            type={`button`}
          >
            Sign Out
          </button>
        </div>
      </aside>
    </Modal>
  );
};

export default Sidebar;
