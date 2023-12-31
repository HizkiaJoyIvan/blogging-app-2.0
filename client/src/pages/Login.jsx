import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const pwdRef = useRef();
  const pwdAgainRef = useRef();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwdRef.current.value !== pwdAgainRef.current.value) {
      pwdAgainRef.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        email: emailRef.current.value,
        pwd: pwdRef.current.value,
      };
      try {
        console.log(user);
        await login(user);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" bg-white rounded shadow-lg overflow-hidden w-full max-w-lg flex">
        <div className=" bg-blue-500 text-white py-12 px-4">
          <h1 className="text-3xl font-bold mb-4">Blogify</h1>
          <p className="text-md">
            Connect. Create. Inspire. Start blogging with our app today!
          </p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="input-field mb-4"
              required
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field mb-4"
              required
              ref={pwdRef}
            />
            <input
              type="password"
              placeholder="Password again"
              className="input-field mb-4"
              required
              ref={pwdAgainRef}
            />
            <div className="flex flex-col md:flex-row justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mb-4 md:mb-0"
              >
                Sign In
              </button>
              <a
                href="/register"
                className="bg-white hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Don't have an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
