// import React from "react";
// import AuthForm from "./AuthForm";

// const SignUpPage = () => {
//   return <AuthForm isSignUp={true} />;
// };

// export default SignUpPage;

import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserShield,
  FaCalendar,
  FaQuestionCircle,
} from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "./InputField";

const schema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  birthDate: yup.date().required("Birth Date is required"),
  securityQuestion: yup.string().required("Security question is required"),
  role: yup
    .string()
    .oneOf(["user", "admin"], "Select a valid role")
    .required("Role is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("https://your-api.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) throw new Error(responseData.message || "Signup failed");

      toast.success(responseData.message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 py-12 md:py-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-3xl w-full md:w-3/4 lg:w-2/3">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">Sign up to get started</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* الحقول موزعة على سطرين */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Full Name *"
              type="text"
              placeholder="John Doe"
              icon={<FaUser />}
              register={register("name")}
              error={errors.name}
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
            <InputField
              label="Phone Number *"
              type="tel"
              placeholder="+1234567890"
              icon={<FaPhone />}
              register={register("phone")}
              error={errors.phone}
            />
            <InputField
              label="Birth Date *"
              type="date"
              icon={<FaCalendar />}
              register={register("birthDate")}
              error={errors.birthDate}
            />
            <InputField
              label="Security Question *"
              type="text"
              placeholder="Your first pet's name?"
              icon={<FaQuestionCircle />}
              register={register("securityQuestion")}
              error={errors.securityQuestion}
            />
          </div>

          {/* اختيار الدور */}
          <div>
            <label className="block text-gray-700">Account Type *</label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* الموافقة على الشروط */}
          <div className="flex items-center">
            <input type="checkbox" {...register("terms")} className="mr-2" />
            <label className="text-gray-700">
              I accept the terms and conditions *
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          {/* زر التسجيل */}
          {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* تسجيل الدخول */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

