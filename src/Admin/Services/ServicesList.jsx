import { useState, useMemo, useCallback } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "react-responsive";

const ServicesList = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [services, setServices] = useState([
    {
      id: uuidv4(),
      name: "Spa Treatment",
      price: 50,
      status: "Available",
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Room Cleaning",
      price: 20,
      status: "Available",
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Laundry Service",
      price: 15,
      status: "Unavailable",
      createdAt: new Date(),
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    status: "Available",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // توليد حقول النموذج
  const formFields = useMemo(
    () => [
      {
        name: "name",
        type: "text",
        placeholder: "Service Name",
        required: true,
        pattern: "^[A-Za-z0-9 ]{3,}$",
      },
      {
        name: "price",
        type: "number",
        placeholder: "Price ($)",
        required: true,
        min: 1,
        step: 0.01,
      },
      {
        name: "status",
        type: "select",
        options: ["Available", "Unavailable"],
      },
    ],
    []
  );

  // التحقق من صحة النموذج
  const validateForm = useCallback(() => {
    const { name, price } = formData;
    if (!name.trim() || !price) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      toast.error("Invalid price format");
      return false;
    }
    return true;
  }, [formData]);

  // إدارة تغييرات الحقول
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  }, []);

  // إرسال النموذج
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setServices((prev) => {
        const newService = {
          ...formData,
          id: isEditing ? formData.id : uuidv4(),
          price: parseFloat(formData.price),
          createdAt: new Date(),
        };
        return isEditing
          ? prev.map((s) => (s.id === formData.id ? newService : s))
          : [...prev, newService];
      });

      toast.success(
        <div>
          <span className="font-semibold">
            {isEditing ? "Service Updated!" : "Service Added!"}
          </span>
          <p className="text-sm">{formData.name}</p>
        </div>
      );

      setFormData({ id: "", name: "", price: "", status: "Available" });
      setIsEditing(false);
    },
    [formData, isEditing, validateForm]
  );

  // تحميل بيانات التعديل
  const handleEdit = useCallback((service) => {
    setFormData(service);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // تأكيد الحذف
  const confirmDelete = useCallback((id) => {
    setDeleteCandidate(id);
    toast.info(
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Confirm Deletion</p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => setDeleteCandidate(null)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setServices((prev) => prev.filter((s) => s.id !== id));
              setDeleteCandidate(null);
              toast.success("Service deleted successfully");
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  }, []);

  // فرز الخدمات
  const sortedServices = useMemo(
    () => [...services].sort((a, b) => b.createdAt - a.createdAt),
    [services]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 bg-white rounded-lg shadow-xl rounded-[16px] mt-[32px]"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Services Management
      </h2>
      {/* نموذج الإضافة/التعديل */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-md"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          {isEditing ? "Edit Service" : "Add New Service"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...field}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  id: "",
                  name: "",
                  price: "",
                  status: "Available",
                });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <FaTimes /> {!isMobile && "Cancel"}
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            {isEditing ? <FaCheck /> : <FaPlus />}
            {!isMobile && (isEditing ? "Update Service" : "Add Service")}
          </button>
        </div>
      </form>
      {/* قائمة الخدمات */}
      <div className="rounded-lg shadow overflow-hidden">
        {isMobile ? (
          <div className="space-y-4">
            {sortedServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-white rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-gray-600">${service.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => confirmDelete(service.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs
                      ${
                        service.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                  >
                    {service.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {["Service Name", "Price", "Status", "Created", "Actions"].map(
                  (header) => (
                    <th key={header} className="p-3 text-left text-gray-700">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {sortedServices.map((service) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{service.name}</td>
                    <td className="p-3">${service.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                          ${
                            service.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        `}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => confirmDelete(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}

        {!services.length && (
          <div className="p-6 text-center text-gray-500">
            No services found. Start by adding a new service.
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </motion.div>
  );
};

export default ServicesList;
