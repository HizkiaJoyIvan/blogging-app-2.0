import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const Post = () => {

  const location = useLocation()
  const postId = location.pathname.split('/')[2]

  const [post, setPost] = useState()

  const dummyData = 
  [
    {
      id: '1',
      title: 'Rise of Artificial Intelligence',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://imageio.forbes.com/specials-images/imageserve/64213c10fc7ed6f0a3eb47ae/The-Intersection-Of-AI-And-Human-Creativity--Can-Machines-Really-Be-Creative-/960x0.jpg?format=jpg&width=960',
      postDate: '26-05-2023',
      cat: 'tech'
    },
    {
      id: '2',
      title: 'Introduction to Web Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://rubygarage.s3.amazonaws.com/uploads/article_image/file/709/technology-stack-diagram.jpg',
      postDate: '26-04-2023',
      cat: 'tech'
    },
    {
      id: '3',
      title: 'Introduction to Web Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'https://rubygarage.s3.amazonaws.com/uploads/article_image/file/709/technology-stack-diagram.jpg',
      postDate: '26-04-2023',
      cat: 'tech'
    },
  ]

  useEffect(()=> {
    setPost(dummyData[postId-1])
  }, [postId])

  return (
    <div className='bg-gray-50 h-screen w-screen flex justify-center items-center'>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl">
        <img className="w-full h-48 object-cover" src={post?.img} alt="Post Image" />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
          <p className="text-gray-700 mb-4">{post?.desc}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">{post?.postDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
