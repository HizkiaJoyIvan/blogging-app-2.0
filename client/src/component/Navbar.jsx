import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const categories = ["tech", "travel", "education", "science", "politic", "work", "entertaiment"]

  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between p-4'>
        <div className='flex gap-4'>
            <h1 className='text-4xl font-bold text-purple-500 tracking-wide'>blogify</h1>
            <div className="flex items-center gap-1">
            </div>
        </div>
        <div className='flex items-center gap-2'>
            {categories.map(c => (
                <div className="flex mx-0 border-solid border-2 border-purple-600 px-3 py-2 rounded-3xl text-purple-500 items-center">
                <Link to={`?cat=${c}`}>{c}</Link>
            </div>
            ))}
        </div>
        <div className='flex gap-4 items-center'>
            <p>Register</p>
            <p>Sign In</p>
            <p className='bg-purple-400 text-white p-3 rounded-md'>Create</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar