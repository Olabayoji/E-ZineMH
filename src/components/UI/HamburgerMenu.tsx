import React from "react";

type Props = {
  open: boolean;
  toggle: () => any;
};

const HamburgerMenu = (props: Props) => {
  const genericHamburgerLine = `h-1 w-6 my-[2px] rounded-full bg-black transition ease transform duration-300`;
  return (
    <button
      className={`md:hidden relative z-[1000000000000000] flex flex-col h-10 w-10  border-black rounded justify-center items-center group`}
      onClick={props.toggle}
    >
      <div
        className={`${genericHamburgerLine} ${
          props.open
            ? "rotate-45 translate-y-[12px] opacity-50 group-hover:opacity-100"
            : " group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          props.open ? "opacity-0" : " group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          props.open
            ? "-rotate-45 -translate-y-[4px] opacity-50 group-hover:opacity-100"
            : " group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
