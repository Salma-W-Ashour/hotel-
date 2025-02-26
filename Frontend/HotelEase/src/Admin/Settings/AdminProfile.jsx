import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "",
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "",
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "",
    profileImage: "https://via.placeholder.com/150",
  },
];

const AdminProfile = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const [profile, setProfile] = useState(users[0]);

  const handleUserChange = (e) => {
    const userId = parseInt(e.target.value);
    const selectedUser = users.find((user) => user.id === userId);
    setSelectedUserId(userId);
    setProfile({ ...selectedUser });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profileImage: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === selectedUserId ? { ...profile, password: "" } : user
    );

    setUsers(updatedUsers);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Manage User Accounts
      </h2>

      {/* Dropdown to Select User */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white mb-2">
          Select User:
        </label>
        <select
          value={selectedUserId}
          onChange={handleUserChange}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Profile Image Upload */}
      <div className="flex items-center mb-4">
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-700 shadow-md"
        />
        <div className="ml-4">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={profile.email}
          onChange={handleChange}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={profile.password}
          onChange={handleChange}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={profile.confirmPassword}
          onChange={handleChange}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
