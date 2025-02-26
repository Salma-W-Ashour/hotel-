// // import React from "react";
// // import AuthForm from "./AuthForm";

// // const LoginPage = () => {
// //   return <AuthForm isSignUp={false} />;
// // };

// // export default LoginPage;

// import { useForm } from "react-hook-form";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import InputField from "./InputField";
// import { useAuth } from "./context/AuthContext";

// const schema = yup.object({
//   username: yup.string().required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const SignInPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("savedEmail");
//     if (savedEmail) {
//       setValue("email", savedEmail);
//     }
//   }, [setValue]);

//   const onSubmit = (data) => {
//     if (data.rememberMe) {
//       localStorage.setItem("savedEmail", data.email);
//     } else {
//       localStorage.removeItem("savedEmail");
//     }

//     // تحديد إذا كان المستخدم هو admin أو مستخدم عادي
//     const role = data.email === "admin@gmail.com" ? "admin" : "user";

//     // تسجيل الدخول باستخدام context
//     const userData = { name: data.username, role };
//     login(userData);

//     // إظهار إشعار النجاح
//     toast.success("Logged in successfully!");

//     // توجيه المستخدم بناءً على الدور
//     if (role === "admin") {
//       navigate("/admin");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
//         <p className="text-center text-gray-600 mb-6">
//           Sign in to book your perfect stay
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <InputField
//             label="Username *"
//             type="text"
//             placeholder="Your Username"
//             icon={<FaUser />}
//             register={register("username")}
//             error={errors.username}
//           />
//           <InputField
//             label="Email *"
//             type="email"
//             placeholder="example@example.com"
//             icon={<FaEnvelope />}
//             register={register("email")}
//             error={errors.email}
//           />
//           <InputField
//             label="Password *"
//             type="password"
//             placeholder="••••••••"
//             icon={<FaLock />}
//             register={register("password")}
//             error={errors.password}
//           />
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 {...register("rememberMe")}
//                 className="mr-2"
//               />{" "}
//               Remember Me
//             </label>
//             <a href="/forgot-password" className="text-blue-500">
//               Forgot Password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition mt-2"
//           >
//             Sign In
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/sign-up" className="text-blue-500">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;

import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import InputField from "./InputField";
import { useAuth } from "./context/AuthContext";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = useCallback((data) => {
    if (data.rememberMe) {
      localStorage.setItem("savedEmail", data.email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    // تحديد إذا كان المستخدم هو admin أو مستخدم عادي
    const role = data.email === "admin@gmail.com" ? "admin" : "user";

    // تسجيل الدخول باستخدام context
    const userData = { name: data.username, role };
    login(userData);

    // تفعيل التحميل
    setIsLoading(true);

    // عرض رسالة النجاح
    toast.success("Logged in successfully!", {
      autoClose: 2000,
    });

    // إضافة تأخير صناعي لمدة 3 ثوانٍ قبل الانتقال
    setTimeout(() => {
      setIsLoading(false); // إيقاف التحميل
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 3000); // تأخير 3 ثوانٍ
  }, [login, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to book your perfect stay
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Username *"
            type="text"
            placeholder="Your Username"
            icon={<FaUser />}
            register={register("username")}
            error={errors.username}
          />
          <InputField
            label="Email *"
            type="email"
            placeholder="example@example.com"
            icon={<FaEnvelope />}
            register={register("email")}
            error={errors.email}
          />
          <InputField
            label="Password *"
            type="password"
            placeholder="••••••••"
            icon={<FaLock />}
            register={register("password")}
            error={errors.password}
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2"
              />{" "}
              Remember Me
            </label>
            <a href="/forgot-password" className="text-blue-500">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition mt-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;