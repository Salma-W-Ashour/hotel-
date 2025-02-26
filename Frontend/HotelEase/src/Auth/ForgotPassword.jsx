import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLock,
  FiMail,
  FiHelpCircle,
  FiCheckCircle,
} from "react-icons/fi";

// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  securityQuestion: yup.string().required("Security question is required"),
  securityAnswer: yup.string().required("Security answer is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Reusable Components
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
    {children}
  </div>
);

const InputField = ({ icon, label, error, ...props }) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {label}
    </label>
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-500 transition-colors ${
        error ? "border-red-500" : "border-gray-200"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Button = ({ children, loading, ...props }) => (
  <button
    {...props}
    disabled={loading}
    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {loading ? "Processing..." : children}
  </button>
);

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetPassword = async (data) => {
    setLoading(true);
    clearErrors();

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated security answer validation
      if (data.securityAnswer.toLowerCase() !== "answer") {
        setError("securityAnswer", {
          type: "manual",
          message: "Incorrect security answer",
        });
        throw new Error("Security answer verification failed");
      }

      // Simulated success
      toast.success("Password reset successfully!");
      setStep(3);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (!error.message.includes("Security answer")) {
        toast.error(error.message || "Password reset failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <FiArrowLeft className="mr-2" />
                Back to Login
              </button>
              <h1 className="text-3xl font-bold text-gray-800 mt-4">
                Reset Password
              </h1>
              <p className="text-gray-500 mt-2">
                Please provide the required information to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit(handleResetPassword)}>
              <InputField
                icon={<FiMail />}
                label="Email Address"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />

              <InputField
                icon={<FiHelpCircle />}
                label="Security Question"
                type="text"
                {...register("securityQuestion")}
                error={errors.securityQuestion?.message}
                disabled
                value="What city were you born in?"
              />

              <InputField
                label="Security Answer"
                type="text"
                {...register("securityAnswer")}
                error={errors.securityAnswer?.message}
              />

              <InputField
                icon={<FiLock />}
                label="New Password"
                type="password"
                {...register("newPassword")}
                error={errors.newPassword?.message}
              />

              <InputField
                icon={<FiLock />}
                label="Confirm New Password"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button type="submit" loading={loading}>
                Reset Password
              </Button>
            </form>
          </>
        );

      case 3:
        return (
          <div className="text-center py-8">
            <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600">
              You will be redirected to the login page...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">{renderStepContent()}</Card>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ForgetPassword;
