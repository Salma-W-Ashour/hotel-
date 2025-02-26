const DashboardHome = () => {
  return (
    <div className="dashboard-home flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold mb-4">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Easily manage your website and control all functionalities.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default DashboardHome;
