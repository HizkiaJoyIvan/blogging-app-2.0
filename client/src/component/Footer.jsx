import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white p-5 flex-shrink-0">
      <div className="container mx-auto flex justify-between items-center px-10 h-full">
        <div className="text-md">CONTACT US</div>
        <div className="">
          <div className="text-xl my-5">OTHERS</div>
          <ul className="text-sm flex flex-col gap-1 cursor-pointer">
            <li>Soon</li>
            <li>Soon</li>
            <li>Soon</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
