// import React from "react";
// import AuthForm from "./AuthForm";

// const LoginPage = () => {
//   return <AuthForm isSignUp={false} />;
// };

// export default LoginPage;

import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaFacebook,
  FaSpinner,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import InputField from "./InputField";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [setValue]);

  const onSubmit = useCallback(
    (data) => {
      // مثال: بيانات حسابات موجودة مسبقًا (يمكنك استبدالها ببيانات فعلية من API أو قاعدة بيانات)
      const existingUsers = [
        { email: "admin@gmail.com", username: "admin" },
        { email: "user@example.com", username: "user123" },
      ];

      // التحقق مما إذا كان الحساب موجودًا
      const userExists = existingUsers.find(
        (user) => user.email === data.email && user.username === data.username
      );

      if (!userExists) {
        toast.error("Account does not exist. Please sign up first!", {
          autoClose: 3000,
        });
        return; // إيقاف التنفيذ
      }

      if (data.rememberMe) {
        localStorage.setItem("savedEmail", data.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      const role = data.email === "admin@gmail.com" ? "admin" : "user";
      login({ name: data.username, role });

      setIsLoading(true);
      toast.success("Logged in successfully!", { autoClose: 2000 });

      setIsLoading(false);
      navigate(role === "admin" ? "/admin" : "/");
    },
    [login, navigate]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // return (
  //   <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
  //     <ToastContainer position="top-right" autoClose={2000} />
  //     <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
  //       <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
  //       <p className="text-center text-gray-600 mb-6">
  //         Sign in to book your perfect stay
  //       </p>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <InputField
  //           label="Username *"
  //           type="text"
  //           placeholder="Your Username"
  //           icon={<FaUser />}
  //           register={register("username")}
  //           error={errors.username}
  //         />
  //         <InputField
  //           label="Email *"
  //           type="email"
  //           placeholder="example@example.com"
  //           icon={<FaEnvelope />}
  //           register={register("email")}
  //           error={errors.email}
  //         />
  //         <InputField
  //           label="Password *"
  //           type="password"
  //           placeholder="••••••••"
  //           icon={<FaLock />}
  //           register={register("password")}
  //           error={errors.password}
  //         />
  //         <div className="flex items-center justify-between text-sm text-gray-600">
  //           <label className="flex items-center">
  //             <input
  //               type="checkbox"
  //               {...register("rememberMe")}
  //               className="mr-2"
  //             />{" "}
  //             Remember Me
  //           </label>
  //           <a href="/forgot-password" className="text-blue-500">
  //             Forgot Password?
  //           </a>
  //         </div>
  //         <button
  //           type="submit"
  //           disabled={isLoading}
  //           className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition mt-2 ${
  //             isLoading ? "opacity-50 cursor-not-allowed" : ""
  //           }`}
  //         >
  //           {isLoading ? "Signing In..." : "Sign In"}
  //         </button>
  //       </form>
  //       <p className="text-center text-sm text-gray-600 mt-4">
  //         Don't have an account?{" "}
  //         <a href="/sign-up" className="text-blue-500">
  //           Sign Up
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Username"
            type="text"
            placeholder=" "
            icon={<FaUser className="text-gray-400" />}
            register={register("username")}
            error={errors.username}
            floatingLabel
          />

          <InputField
            label="Email"
            type="email"
            placeholder=" "
            icon={<FaEnvelope className="text-gray-400" />}
            register={register("email")}
            error={errors.email}
            floatingLabel
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            icon={<FaLock className="text-gray-400" />}
            register={register("password")}
            error={errors.password}
            floatingLabel
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2  top-3 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="text-red-600" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FaFacebook className="text-blue-600" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
