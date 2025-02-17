import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-2">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-center text-gray-600 mb-4">
            {isLogin
              ? "Sign in to book your perfect stay"
              : "Sign up to get started"}
          </p>
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-yellow-400 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-blue-500 underline ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
