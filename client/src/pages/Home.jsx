import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";

const Home = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const cat = queryParams.get("cat");
  const [posts, setPosts] = useState();
  const PF = process.env.REACT_APP_URI + "/images/";

  const { currentUser } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = cat
          ? await axios.get(`${process.env.REACT_APP_URI}/post?cat=${cat}&page=${currentPage}&limit=3`)
          : await axios.get(`${process.env.REACT_APP_URI}/post?page=${currentPage}&limit=3`);
        setPosts(res.data.results);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className="bg-gray-50 w-screen mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 mx-4 gap-5 my-10">
        {posts?.map((post) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
            <img
              className="w-full h-48 object-cover"
              src={PF + post?.img}
              alt="Post Image"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
              <p className="text-gray-700 mb-4">{post?.descriptions}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">
                  {moment(post.postDate).fromNow()}
                </span>
                <Link
                  className="text-blue-500 font-semibold hover:text-blue-700"
                  to={`/post/${post?.post_id}`}
                >
                  Read more
                </Link>
              </div>
              <div className="font-semibold text-white py-1 px-2 bg-blue-500 rounded-md w-32 text-xs flex justify-center">
                {post?.cat.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
