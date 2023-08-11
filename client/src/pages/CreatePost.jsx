import axios from "axios";
import React, { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState();

  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post(`${process.env.REACT_API_URI}/upload`, formData)
      return res.data
    } catch(err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imgURL = await upload()

    try {
      const post = {
        title: title, 
        descriptions: desc, 
        img: file ? imgURL : "", 
        postDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), 
        userId: currentUser.user_id,
        cat
      }
      console.log(post)
      await axios.post(`${process.env.REACT_API_URI}/post`, post)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div className="bg-gray-50 h-screen w-screen flex justify-center items-center p-10">
      <div className="bg-white w-screen  shadow-lg overflow-hidden rounded-md mt-10">
        <form action="" className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="desc" className="block font-medium text-gray-700">
              Descriptions
            </label>
            <textarea
              name="desc"
              id="tesc"
              cols="50"
              rows="8"
              placeholder="Enter the descriptions"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="img" className="block font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="img"
              name="img"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="img" className="block font-medium text-gray-700">
              Category
            </label>
            <div className="border border-gray-300 rounded p-4 grid grid-cols-3 gap-4">
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="tech"
                  id="tech"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="tech" className="text-gray-700">
                  Tech
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="travel"
                  id="travel"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="travel" className="text-gray-700">
                  Travel
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="education"
                  id="education"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="education" className="text-gray-700">
                  Education
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="science"
                  id="science"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="science" className="text-gray-700">
                  Science
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="politic"
                  id="politic"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="politic" className="text-gray-700">
                  Politic
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="work"
                  id="work"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="work" className="text-gray-700">
                  Work
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="cat"
                  value="entertainment"
                  id="entertainment"
                  onChange={(e) => setCat(e.target.value)}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="entertainment" className="text-gray-700">
                  Entertainment
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
