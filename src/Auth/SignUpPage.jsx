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
  FaGoogle,
  FaFacebook,
  FaCheck,
} from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InputField from "./InputField";
import { useAuth } from "../context/AuthContext";

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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // تحقق من وجود الحساب قبل إرسال الطلب
      const checkUserRes = await fetch("https://your-api.com/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }), // إرسال البريد الإلكتروني فقط للتحقق
      });

      const checkUserData = await checkUserRes.json();

      if (!checkUserRes.ok) {
        // throw new Error(checkUserData.message || "User check failed");
        throw new Error("Network response was not ok");
      }

      if (checkUserData.exists) {
        toast.error("This account already exists, please log in.");
        setLoading(false);
        return; // إذا كان الحساب موجودًا، يتم إيقاف عملية التسجيل
      }

      // إذا لم يكن الحساب موجودًا، استمر في عملية التسجيل
      const res = await fetch("https://your-api.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      console.log("API Response:", responseData);

      // if (!res.ok) throw new Error(responseData.message || "Signup failed");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Signup failed: ${res.statusText}`
        );
      }

      toast.success(responseData.message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        toast.error("Network error - Please check your internet connection");
      } else {
        toast.error(error.message);
      }
      console.error("Signup Error:", error);
      // toast.error(error.message);
      reset({
        name: "",
        email: "",
        password: "",
        phone: "",
        birthDate: "",
        securityQuestion: "",
        role: "",
        terms: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 py-12 md:py-20">
  //     <ToastContainer position="top-right" autoClose={3000} />
  //     <div className="bg-white p-10 rounded-lg shadow-xl max-w-3xl w-full md:w-3/4 lg:w-2/3">
  //       <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
  //         Create an Account
  //       </h2>
  //       <p className="text-center text-gray-600 mb-6">Sign up to get started</p>

  //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //         {/* الحقول موزعة على سطرين */}
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //           <InputField
  //             label="Full Name *"
  //             type="text"
  //             placeholder="John Doe"
  //             icon={<FaUser />}
  //             register={register("name")}
  //             error={errors.name}
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
  //           <InputField
  //             label="Phone Number *"
  //             type="tel"
  //             placeholder="+1234567890"
  //             icon={<FaPhone />}
  //             register={register("phone")}
  //             error={errors.phone}
  //           />
  //           <InputField
  //             label="Birth Date *"
  //             type="date"
  //             icon={<FaCalendar />}
  //             register={register("birthDate")}
  //             error={errors.birthDate}
  //           />
  //           <InputField
  //             label="Security Question *"
  //             type="text"
  //             placeholder="Your first pet's name?"
  //             icon={<FaQuestionCircle />}
  //             register={register("securityQuestion")}
  //             error={errors.securityQuestion}
  //           />
  //         </div>

  //         {/* اختيار الدور */}
  //         {/* <div>
  //           <label className="block text-gray-700">Account Type *</label>
  //           <select
  //             {...register("role")}
  //             className="w-full px-3 py-2 border rounded-lg"
  //           >
  //             <option value="">Select a role</option>
  //             <option value="user">User</option>
  //             <option value="admin">Admin</option>
  //           </select>
  //           {errors.role && (
  //             <p className="text-red-500 text-sm">{errors.role.message}</p>
  //           )}
  //         </div> */}

  //         {/* الموافقة على الشروط */}
  //         <div className="flex items-center">
  //           <input type="checkbox" {...register("terms")} className="mr-2" />
  //           <label className="text-gray-700">
  //             I accept the terms and conditions *
  //           </label>
  //         </div>
  //         {errors.terms && (
  //           <p className="text-red-500 text-sm">{errors.terms.message}</p>
  //         )}

  //         {/* زر التسجيل */}
  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
  //         >
  //           {loading ? (
  //             <svg
  //               aria-hidden="true"
  //               className="w-5 h-5 text-white animate-spin"
  //               viewBox="0 0 100 101"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //                 fill="currentColor"
  //               />
  //               <path
  //                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //                 fill="currentFill"
  //               />
  //             </svg>
  //           ) : (
  //             "Sign Up"
  //           )}
  //         </button>
  //       </form>

  //       {/* تسجيل الدخول */}
  //       <p className="text-center text-sm text-gray-700 mt-6">
  //         Already have an account?{" "}
  //         <a href="/sign-in" className="text-blue-600">
  //           Sign In
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">Start your journey with us today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              type="text"
              placeholder=" "
              icon={<FaUser className="text-gray-400" />}
              register={register("name")}
              error={errors.name}
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
              type="password"
              placeholder=" "
              icon={<FaLock className="text-gray-400" />}
              register={register("password")}
              error={errors.password}
              floatingLabel
            />

            <InputField
              label="Phone Number"
              type="tel"
              placeholder=" "
              icon={<FaPhone className="text-gray-400" />}
              register={register("phone")}
              error={errors.phone}
              floatingLabel
            />

            <InputField
              label="Birth Date"
              type="date"
              icon={<FaCalendar className="text-gray-400" />}
              register={register("birthDate")}
              error={errors.birthDate}
              floatingLabel
            />

            <InputField
              label="Security Question"
              type="text"
              placeholder=" "
              icon={<FaQuestionCircle className="text-gray-400" />}
              register={register("securityQuestion")}
              error={errors.securityQuestion}
              floatingLabel
            />
          </div>

          <div className="space-y-4">
            {/* <div className="relative">
              <select
                {...register("role")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none"
              >
                <option value="">Select Account Type</option>
                <option value="user">Standard User</option>
                <option value="admin">Administrator</option>
              </select>
              <FaUserShield className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div> */}

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register("terms")}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            // className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Account...
              </div>
            ) : (
              <>
                <FaCheck className="w-5 h-5" />
                Sign Up Now
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="text-red-600 text-xl" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
