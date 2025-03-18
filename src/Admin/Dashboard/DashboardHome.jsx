import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard/analytics"); // تغيير المسار حسب هيكل التطبيق
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to the Admin Dashboard
        </h2>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Effortlessly manage your digital ecosystem with powerful tools and
          real-time insights.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* إضافة إحصائيات سريعة */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl px-4">
        {[
          { title: "Active Users", value: "2.5K", color: "bg-green-100" },
          { title: "Total Sales", value: "$124K", color: "bg-blue-100" },
          { title: "New Orders", value: "356", color: "bg-purple-100" },
          { title: "Pending Tasks", value: "12", color: "bg-yellow-100" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className={`p-6 rounded-xl ${stat.color} shadow-sm hover:shadow-md transition-shadow`}
          >
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
