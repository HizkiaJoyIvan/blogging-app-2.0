import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {dummyCat} from "../dummyData"

const Navbar = () => {
  const categories = [
    "Tech",
    "Travel",
    "Education",
    "Science",
    "Politic",
    "Industry",
    "History",
  ];
  const [category, setCategory] = useState();

  const cat = useLocation().search.split("=");

  const {currentUser, logout} = useContext(AuthContext);

  useEffect(() => {
    setCategory(cat[1]);
    console.log(category);
  }, [cat]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between p-4">
        <div className="flex gap-4">
          <a
            href="/"
            className="text-4xl font-bold text-purple-500 tracking-wide"
          >
            testing
          </a>
          <div className="flex items-center gap-1"></div>
        </div>
        <div className="flex items-center gap-2">
          {categories.map((c) => (
            <div
              className={
                category === c
                  ? "flex mx-0 border-solid border-2 border-purple-600 px-3 py-2 rounded-3xl text-white bg-purple-600 items-center"
                  : "flex mx-0 border-solid border-2 border-purple-600 px-3 py-2 rounded-3xl text-purple-500 items-center"
              }
            >
              <Link to={`?cat=${c}`}>{c}</Link>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          {currentUser ? (
            <>
              <a onClick={logout} className="cursor-pointer">Sign Out</a>
              <a href="/createPost"
                 className="bg-purple-400 text-white p-3 rounded-md">Create
              </a>
            </>) : 
            (<>
              <a href="/register">Register</a>
              <a href="/login">Sign In</a>
            </>)
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
