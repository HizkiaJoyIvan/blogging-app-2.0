import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white p-5  bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-10">
        <div className="text-md">CONTACT US</div>
        <div className="mt-5 md:mt-0">
          <div className="text-xl mb-2">OTHERS</div>
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
