import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaReply,
  FaRegStar,
  FaStar,
  FaPaperclip,
  FaRegClock,
  FaRobot,
} from "react-icons/fa";
import { FiChevronDown, FiAlertTriangle } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const NotificationsPanel = ({ isOpen, onClose, messages, onNewReply }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [priorityMode, setPriorityMode] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleReply = (messageId) => {
    if (!replyMessage.trim()) return;
    onNewReply(messageId, replyMessage);
    setReplyMessage("");
    setActiveMessageId(null);
  };

  const filteredMessages = messages.filter((msg) => {
    if (selectedTab === "unread") return !msg.read;
    if (selectedTab === "priority") return msg.priority;
    return true;
  });

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000]"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-50 bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center"
          >
            <motion.div
              className="w-full max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col"
              style={{
                maxHeight: "90vh",
                height: "calc(100vh - 4rem)",
              }}
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <HiOutlineSparkles className="text-2xl text-amber-400" />
                    <h2 className="text-xl font-bold">Guest Communications</h2>
                    <div className="hidden md:flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setPriorityMode(!priorityMode)}
                        className={`p-2 rounded-lg ${
                          priorityMode ? "bg-amber-400/20" : "hover:bg-white/10"
                        }`}
                      >
                        {priorityMode ? (
                          <FaStar className="text-amber-400" />
                        ) : (
                          <FaRegStar className="opacity-75" />
                        )}
                      </button>
                      <span className="text-sm opacity-85">
                        {messages.filter((m) => m.priority).length} Priority
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mt-4">
                  {["all", "unread", "priority"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm capitalize ${
                        selectedTab === tab
                          ? "bg-white/20 font-semibold"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {tab} (
                      {
                        messages.filter((m) =>
                          tab === "all"
                            ? true
                            : tab === "unread"
                            ? !m.read
                            : m.priority
                        ).length
                      }
                      )
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout
                    className={`group relative bg-white rounded-xl shadow-sm border-2 ${
                      message.priority
                        ? "border-amber-400/50 hover:border-amber-400"
                        : "border-transparent hover:border-blue-200"
                    } transition-all`}
                  >
                    <div className="p-4">
                      {/* Message Header */}
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-900 font-semibold">
                              {message.name.charAt(0)}
                            </span>
                          </div>
                          {message.priority && (
                            <div className="absolute -right-1 -bottom-1 bg-amber-400 rounded-full p-1">
                              <FiAlertTriangle className="text-white text-xs" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{message.name}</h3>
                              <p className="text-sm text-gray-500">
                                {message.email}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <FaRegClock className="text-xs" />
                              <span>
                                {new Date(message.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}{" "}
                                {new Date(message.createdAt).toLocaleTimeString(
                                  "en-GB",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Message Preview */}
                          <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                            {message.message}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() =>
                                setActiveMessageId(
                                  activeMessageId === message.id
                                    ? null
                                    : message.id
                                )
                              }
                              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                            >
                              <FiChevronDown
                                className={`transform transition-transform ${
                                  activeMessageId === message.id
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                              {message.replies.length} Responses
                            </button>
                            {message.attachments?.length > 0 && (
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <FaPaperclip className="text-xs" />
                                {message.attachments.length}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {activeMessageId === message.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-100"
                          >
                            {/* Full Message */}
                            <div className="prose prose-sm max-w-none mb-6">
                              {message.message}
                            </div>

                            {/* Replies */}
                            {message.replies.length > 0 && (
                              <div className="space-y-4 ml-6 border-l-2 border-blue-100 pl-4">
                                {message.replies.map((reply, index) => (
                                  <div
                                    key={index}
                                    className="relative bg-blue-50 rounded-lg p-4"
                                  >
                                    <div className="absolute left-0 top-4 -ml-2.5 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    <div className="flex items-start gap-3">
                                      <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-xs">
                                        {reply.admin ? "HS" : "YO"}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 text-xs mb-1">
                                          <span className="font-medium">
                                            {reply.admin
                                              ? "Hotel Staff"
                                              : "Your Reply"}
                                          </span>
                                          <span className="text-gray-400">
                                            {new Date(
                                              reply.date
                                            ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                            })}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                          {reply.content}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* AI Assistant */}
                            <div className="mt-6 bg-amber-50 rounded-lg p-4">
                              <div className="flex items-center gap-3 text-amber-800 mb-2">
                                <FaRobot className="text-lg" />
                                <span className="text-sm font-medium">
                                  AI Response Suggestions
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[
                                  "Thank you for your message. We'll address this immediately.",
                                  "Could you provide more details about your request?",
                                  "We've upgraded your reservation as requested!",
                                ].map((suggestion, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setReplyMessage(suggestion)}
                                    className="text-left p-2 text-sm rounded-md hover:bg-amber-100 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Reply Editor */}
                            <div className="mt-6">
                              <textarea
                                value={replyMessage}
                                onChange={(e) =>
                                  setReplyMessage(e.target.value)
                                }
                                placeholder="Type your response..."
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 resize-none shadow-sm"
                                rows="3"
                              />
                              <div className="flex justify-end gap-2 mt-3">
                                <button
                                  onClick={() => setActiveMessageId(null)}
                                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReply(message.id)}
                                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-lg flex items-center gap-2 transition-all"
                                >
                                  <FaReply className="text-sm" />
                                  Send Response
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Compose Button */}
              <div className="sticky bottom-0 p-4 bg-gradient-to-t from-white via-white/90 mt-auto">
                <button className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2 shadow-lg">
                  <HiOutlineSparkles className="text-lg" />
                  Compose New Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NotificationsPanel;
