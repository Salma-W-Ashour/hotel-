// import React from "react";

// const InputField = ({ label, type, placeholder, icon, register, error }) => {
//   return (
//     <div className="relative mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <div className="relative">
//         <span className="absolute flex items-center inset-y-0 left-0 pl-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           {icon}
//         </span>
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// };

// export default InputField;

const InputField = ({ label, type, placeholder, icon, register, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-3 text-gray-500">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
