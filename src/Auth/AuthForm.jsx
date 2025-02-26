// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import InputField from "./InputField";
// import {
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaPhone,
//   FaCalendar,
//   FaGlobe,
//   FaMoneyBill,
//   FaQuestionCircle,
// } from "react-icons/fa";

// const phoneRegex = /^\+?[0-9]{10,15}$/;
// const schema = yup.object().shape({
//   fullName: yup.string().when("isSignUp", {
//     is: true,
//     then: yup.string().required("Full name is required"),
//   }),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   phone: yup
//     .string()
//     .matches(phoneRegex, "Invalid phone number")
//     .required("Phone number is required"),
//   birthDate: yup
//     .date()
//     .max(new Date(), "Invalid birth date")
//     .required("Birth date is required"),
//   country: yup.string().required("Country is required"),
//   currency: yup.string().required("Preferred currency is required"),
//   securityQuestion: yup.string().required("Security question is required"),
//   terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
// });

// const AuthForm = ({ isSignUp = false }) => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (data) => {
//     try {
//       const endpoint = isSignUp ? "/api/register" : "/api/login";
//       const response = await axios.post(endpoint, data);
//       toast.success(response.data.message);
//       if (!isSignUp) navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
//           {isSignUp ? "Create an Account" : "Welcome Back"}
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           {isSignUp
//             ? "Sign up to get started"
//             : "Sign in to book your perfect stay"}
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {isSignUp && (
//             <InputField
//               label="Full Name *"
//               type="text"
//               placeholder="John Doe"
//               icon={<FaUser />}
//               register={register("fullName")}
//               error={errors.fullName}
//             />
//           )}
//           <InputField
//             label="Email Address *"
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
//           {isSignUp && (
//             <>
//               <InputField
//                 label="Phone Number *"
//                 type="tel"
//                 placeholder="+1234567890"
//                 icon={<FaPhone />}
//                 register={register("phone")}
//                 error={errors.phone}
//               />
//               <InputField
//                 label="Birth Date *"
//                 type="date"
//                 icon={<FaCalendar />}
//                 register={register("birthDate")}
//                 error={errors.birthDate}
//               />
//               <div>
//                 <label className="block text-gray-700"> Country *</label>
//                 <select
//                   className="w-full p-2 border rounded"
//                   {...register("country")}
//                 >
//                   <option value="">Select your country</option>
//                   <option value="USA">USA</option>
//                   <option value="UK">UK</option>
//                   <option value="Canada">Canada</option>
//                 </select>
//                 {errors.country && (
//                   <p className="text-red-500 text-sm">
//                     {errors.country.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-gray-700">
//                   Preferred Currency *
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded"
//                   {...register("currency")}
//                 >
//                   <option value="">Select your currency</option>
//                   <option value="USD">USD</option>
//                   <option value="EUR">EUR</option>
//                   <option value="GBP">GBP</option>
//                 </select>
//                 {errors.currency && (
//                   <p className="text-red-500 text-sm">
//                     {errors.currency.message}
//                   </p>
//                 )}
//               </div>
//               <InputField
//                 label="Security Question *"
//                 type="text"
//                 icon={<FaQuestionCircle />}
//                 placeholder="Your first pet's name?"
//                 register={register("securityQuestion")}
//                 error={errors.securityQuestion}
//               />
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   {...register("terms")}
//                   className="mr-2"
//                 />
//                 <label className="text-gray-700">
//                   I accept the terms and conditions *
//                 </label>
//               </div>
//               {errors.terms && (
//                 <p className="text-red-500 text-sm">{errors.terms.message}</p>
//               )}
//             </>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             {isSignUp ? "Sign Up" : "Sign In"}
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-6">
//           {isSignUp ? "Already have an account?" : "Don't have an account?"}
//           <button
//             className="text-blue-500 underline ml-1 hover:text-blue-700"
//             onClick={() => navigate(isSignUp ? "/sign-in" : "/sign-up")}
//           >
//             {isSignUp ? "Sign in" : "Sign up"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
