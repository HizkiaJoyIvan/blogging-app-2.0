import React, { useContext, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {

  const cat = useLocation().search

  const {currentUser} = useContext(AuthContext)

  useEffect(()=> {
    console.log(currentUser)
  }, [cat])

  const dummyData = 
  [
    {
      id: '1',
      title: 'Rise of Artificial Intelligence',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://imageio.forbes.com/specials-images/imageserve/64213c10fc7ed6f0a3eb47ae/The-Intersection-Of-AI-And-Human-Creativity--Can-Machines-Really-Be-Creative-/960x0.jpg?format=jpg&width=960',
      postDate: '26-05-2023'
    },
    {
      id: '2',
      title: 'Introduction to Web Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://rubygarage.s3.amazonaws.com/uploads/article_image/file/709/technology-stack-diagram.jpg',
      postDate: '26-04-2023'
    },
    {
      id: '3',
      title: 'Introduction to Web Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://rubygarage.s3.amazonaws.com/uploads/article_image/file/709/technology-stack-diagram.jpg',
      postDate: '26-04-2023'
    },
  ]

  return (
    <div className='bg-gray-50 h-screen w-screen'>
      {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm flex">
        <img className="w-full h-48 object-cover" src={dummyData[0].img} alt="Post Image" />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{dummyData[0].title}</h2>
          <p className="text-gray-700 mb-4">{dummyData[0].desc}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">{dummyData[0].postDate}</span>
            <Link className="text-blue-500 font-semibold hover:text-blue-700" to={`/post/${dummyData[0].id}`}>
              Read more
            </Link>
          </div>
        </div>
      </div> */}
      <div className="flex mx-4 gap-5 my-10">
        {dummyData.map(dummyPost => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
            <img className="w-full h-48 object-cover" src={dummyPost.img} alt="Post Image" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{dummyPost.title}</h2>
              <p className="text-gray-700 mb-4">{dummyPost.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">{dummyPost.postDate}</span>
                <Link className="text-blue-500 font-semibold hover:text-blue-700" to={`/post/${dummyPost.id}`}>
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      
  )
}

export default Home
