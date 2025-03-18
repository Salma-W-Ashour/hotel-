import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiCamera, FiLock, FiMail, FiUser, FiSave } from "react-icons/fi";

// Default Users Data
const usersData = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: 2, // Fix: unique ID for each user
    name: "Default User",
    email: "user@example.com",
    password: "",
    profileImage: "https://picsum.photos/150",
  },
  // ... other users
];

const AdminProfile = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const [profile, setProfile] = useState({ ...users[0] });
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle User Change (on user select dropdown)
  const handleUserChange = (e) => {
    const userId = parseInt(e.target.value);
    const selectedUser = getUserById(userId);
    setSelectedUserId(userId);
    setProfile({ ...selectedUser, confirmPassword: "" });
    toast.info(`Switched to user: ${selectedUser.name}`);
  };

  // Handle Changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      updatePasswordStrength(value);
    }
  };

  // Password Strength Calculation
  const updatePasswordStrength = (password) => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  // Password Strength Logic
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    return strength;
  };

  // Get User by ID
  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateProfileImage(imageUrl);
    }
  };

  // Update Profile Image in the State
  const updateProfileImage = (imageUrl) => {
    setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    toast.success("Profile image updated successfully!");
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid()) {
      saveUpdatedUserProfile();
    }
  };

  // Check if Passwords Match
  const isPasswordValid = () => {
    if (profile.password && profile.password !== profile.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Save Updated User Profile to Users Data
  const saveUpdatedUserProfile = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUserId
        ? { ...profile, password: profile.password || user.password }
        : user
    );
    setUsers(updatedUsers);
    toast.success("Profile updated successfully!");
  };

  // Determine Password Strength Color
  const getStrengthColor = () => {
    const colors = ["red", "orange", "yellow", "green", "darkgreen"];
    return colors[passwordStrength] || "gray";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto rounded-[16px] mt-[32px]"
    >
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiUser className="text-blue-600" />
        User Account Management
      </h2>

      {/* User Selection Dropdown */}
      <div className="mb-8">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Select User Account
        </label>
        <select
          value={selectedUserId}
          onChange={handleUserChange}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} <span className="text-gray-400">({user.email})</span>
            </option>
          ))}
        </select>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer transform transition hover:scale-110">
            <FiCamera className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-1 h-1 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 bg-${getStrengthColor()}-500`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <FiSave className="text-lg" />
            Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
