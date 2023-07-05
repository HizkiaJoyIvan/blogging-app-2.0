import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white p-5 flex-shrink-0">
      <div className="container mx-auto flex justify-between items-center px-10 h-full">
        <div className="text-md">CONTACT ME</div>
        <div className="">
          <div className="text-xl my-5">MY OTHER PROJECTS</div>
          <ul className="text-sm flex flex-col gap-1 cursor-pointer">
            <li>Firebase Chat App</li>
            <li>Database Web App</li>
            <li>Social Media Clone</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
