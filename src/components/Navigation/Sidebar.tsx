import React from "react";
import { BiHealth } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Modal from "../UI/Modal";

type Props = {
  open: boolean;
  toggle: () => any;
  show: boolean;
};

const Sidebar = (props: Props) => {
  return (
    <Modal onClose={props.toggle} show={props.show}>
      <aside
        className={`z-10 fixed top-0 left-0 w-3/4 md:w-2/4 h-screen -translate-x-full bg-black flex flex-col overflow-hidden ${
          props.open
            ? `translate-x-0 transform transition duration-300 ease-in-out`
            : `-translate-x-full transform transition duration-300 ease-in-out`
        }`}
      >
        <header
          className={!props.open ? "hidden" : "block text-white mt-5 ml-7"}
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
        </ul>
      </aside>
    </Modal>
  );
};

export default Sidebar;
