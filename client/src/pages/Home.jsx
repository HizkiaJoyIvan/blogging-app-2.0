import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import {dummyData, dummyCat} from "../dummyData";

const Home = () => {
  const currentCat = useLocation().search.split("=")[1];
  const [posts, setPosts] = useState();

  const { currentUser } = useContext(AuthContext);

  console.log(currentCat)
  useEffect(() => {
    const usedData = currentCat ? dummyData.filter((data) => data.cat === currentCat) : dummyData
    setPosts(usedData)
  }, [currentCat])


  return (
    <div className="bg-gray-50 h-screen w-screen">
      <div className="flex mx-4 gap-5 my-10">
        {posts?.map((dummyPost) =>  {
          const category = dummyCat.find((cat) => cat.name === dummyPost.cat)
          console.log(category)
          return (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
            <img
              className="w-full h-48 object-cover"
              src={dummyPost.img}
              alt="Post Image"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{dummyPost.title}</h2>
              <p className="text-gray-700 mb-4">{dummyPost.descriptions}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white p-1 rounded-md"
                      style={{ backgroundColor: category.color}}>
                  {dummyPost.cat}
                </span>
                <Link
                  className="text-blue-500 font-semibold hover:text-blue-700"
                  to={`/post/${(dummyPost.id)}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default Home;
