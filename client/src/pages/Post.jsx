import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Post = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [post, setPost] = useState();

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(postId)
        const res = await axios.get(`https://blogging-app-2-0-nj2a4vjr2-mrinsectt.vercel.app/api/post/${postId}`)
        console.log(res.data)
        setPost(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postId]);

  return (
    <div className="bg-gray-50 h-screen w-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl">
        <img
          className="w-full h-48 object-cover"
          src={post?.img}
          alt="Post Image"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
          <p className="text-gray-700 mb-4">{post?.descriptions}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">{moment(post?.postDate).fromNow()}</span>
            {currentUser?.user_id === post?.user_id && (
              <Link className="bg-purple-800 text-white p-3 rounded-md" to={`/editPost/${post?.post_id}`}>
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
