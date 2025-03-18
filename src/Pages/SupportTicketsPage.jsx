import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheckCircle,
  FaTicketAlt,
  FaRegCalendarCheck,
  FaInfoCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SupportTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formik configuration
  const formik = useFormik({
    initialValues: { issue: "", description: "" },
    validationSchema: Yup.object({
      issue: Yup.string().required("Required").min(5, "Minimum 5 characters"),
      description: Yup.string()
        .min(20, "Minimum 20 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitted(true);

        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));

        const newTicket = {
          id: Date.now(),
          ...values,
          status: "open",
          createdAt: new Date().toISOString(),
          replies: [], // Initialize replies array
        };

        // Save ticket to localStorage
        const tickets =
          JSON.parse(localStorage.getItem("supportTickets")) || [];
        localStorage.setItem(
          "supportTickets",
          JSON.stringify([...tickets, newTicket])
        );

        // Show success toast
        toast.success("Ticket created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetForm();
        setTickets([...tickets, newTicket]);
      } catch (error) {
        toast.error("Failed to create ticket", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    },
  });

  // Fetch tickets on component mount
  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(tickets);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-x-hidden">
      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-amber-500/20 p-4 rounded-2xl mb-6">
            <FaTicketAlt className="text-4xl text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-amber-400 mb-2">
            Support Center
          </h1>
          <p className="text-amber-100/80 text-lg">
            We're here to help you with any issues
          </p>
        </motion.div>

        {/* Ticket Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl mb-12"
        >
          <h2 className="text-2xl font-semibold text-amber-300 mb-6 flex items-center gap-3">
            <FaInfoCircle className="text-amber-400" />
            Create New Ticket
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-100 mb-3 font-medium">
                Issue Title
              </label>
              <input
                name="issue"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg text-amber-100 
                         focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                placeholder="Briefly describe your issue"
                {...formik.getFieldProps("issue")}
              />
              {formik.touched.issue && formik.errors.issue && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <FaCheckCircle /> {formik.errors.issue}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-100 mb-3 font-medium">
                Detailed Description
              </label>
              <textarea
                name="description"
                rows="5"
                className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg text-amber-100 
                         focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                placeholder="Please provide detailed information about your issue..."
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <FaCheckCircle /> {formik.errors.description}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            >
              {formik.isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              ) : (
                <>
                  <FaPaperPlane className="text-lg" />
                  Submit Ticket
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Ticket List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-amber-300 mb-6 flex items-center gap-3">
            <FaRegCalendarCheck className="text-amber-400" />
            Your Tickets History
          </h2>

          {tickets.length > 0 ? (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-amber-200">
                        {ticket.issue}
                      </h3>
                      <p className="text-amber-100/80 mt-2">
                        {ticket.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm 
                      ${
                        ticket.status === "open"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : ticket.status === "in-progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="text-amber-100/60">
                      <FaRegCalendarCheck className="inline mr-2" />
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {ticket.replies?.length > 0 && (
                      <div className="text-amber-100/60">
                        {ticket.replies.length}
                        {ticket.replies.length === 1 ? " reply" : " replies"}
                      </div>
                    )}
                  </div>

                  {/* Replies Section */}
                  {ticket.replies?.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-600/50">
                      <h4 className="text-lg font-medium text-amber-200 mb-4">
                        Admin Responses
                      </h4>
                      <div className="space-y-4">
                        {ticket.replies.map((reply, index) => (
                          <div
                            key={index}
                            className="bg-slate-600/20 p-4 rounded-lg border-l-4 border-amber-400"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-amber-100">
                                Support Team
                              </span>
                              <span className="text-sm text-amber-100/60">
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-amber-100/80">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-amber-100/60 mb-4">
                <FaTicketAlt className="text-4xl inline-block" />
              </div>
              <p className="text-amber-100/80">
                No tickets found. Submit your first ticket above!
              </p>
            </div>
          )}
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SupportTicketsPage;
