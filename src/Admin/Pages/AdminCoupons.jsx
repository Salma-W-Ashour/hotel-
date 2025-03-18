import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount_percentage: "",
    expiration_date: "",
  });
  const [editCoupon, setEditCoupon] = useState(null);

  // Load coupons from localStorage
  useEffect(() => {
    const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];
    setCoupons(storedCoupons);
  }, []);

  // Save coupons to localStorage
  const saveCoupons = (updatedCoupons) => {
    localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
    setCoupons(updatedCoupons);
  };

  // Add new coupon
  const handleAddCoupon = () => {
    if (
      !newCoupon.code ||
      !newCoupon.discount_percentage ||
      !newCoupon.expiration_date
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    const updatedCoupons = [
      ...coupons,
      {
        id: Date.now(),
        ...newCoupon,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    saveCoupons(updatedCoupons);
    setNewCoupon({ code: "", discount_percentage: "", expiration_date: "" });
    toast.success("Coupon added successfully!");
  };

  // Edit coupon
  const handleEditCoupon = (coupon) => {
    setEditCoupon(coupon);
    setNewCoupon({
      code: coupon.code,
      discount_percentage: coupon.discount_percentage,
      expiration_date: coupon.expiration_date,
    });
  };

  // Update coupon
  const handleUpdateCoupon = () => {
    if (
      !newCoupon.code ||
      !newCoupon.discount_percentage ||
      !newCoupon.expiration_date
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === editCoupon.id
        ? {
            ...coupon,
            ...newCoupon,
            updated_at: new Date().toISOString(),
          }
        : coupon
    );
    saveCoupons(updatedCoupons);
    setEditCoupon(null);
    setNewCoupon({ code: "", discount_percentage: "", expiration_date: "" });
    toast.success("Coupon updated successfully!");
  };

  // Delete coupon
  const handleDeleteCoupon = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      const updatedCoupons = coupons.filter((coupon) => coupon.id !== id);
      saveCoupons(updatedCoupons);
      toast.success("Coupon deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Coupons</h1>

        {/* Add/Edit Coupon Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editCoupon ? "Edit Coupon" : "Add New Coupon"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full p-2 border rounded-lg"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              className="w-full p-2 border rounded-lg"
              value={newCoupon.discount_percentage}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  discount_percentage: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Expiration Date"
              className="w-full p-2 border rounded-lg"
              value={newCoupon.expiration_date}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, expiration_date: e.target.value })
              }
            />
            <button
              onClick={editCoupon ? handleUpdateCoupon : handleAddCoupon}
              className={`w-full px-6 py-2 rounded-lg text-white transition-all duration-300 ${
                editCoupon
                  ? "bg-green-600 hover:bg-green-700 shadow-lg"
                  : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
              }`}
            >
              {/* {editCoupon ? "Update Coupon" : "Add Coupon"} */}
              {editCoupon ? (
                <>
                  <FaSave className="inline-block mr-2" />
                  Update Coupon
                </>
              ) : (
                <>
                  <FaPlus className="inline-block mr-2" />
                  Add Coupon
                </>
              )}
            </button>
          </div>
        </div>

        {/* Coupons List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Coupons List</h2>
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{coupon.code}</p>
                  <p className="text-gray-600">
                    {coupon.discount_percentage}% off
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires:{" "}
                    {new Date(coupon.expiration_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCoupon(coupon)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
