// import React, { useState, useEffect } from "react";
// import {
//   FiMail,
//   FiTrash2,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiArrowLeft,
// } from "react-icons/fi";

// const AdminSupport = () => {
//   const [messages, setMessages] = useState([]);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Load messages from localStorage
//   useEffect(() => {
//     const loadMessages = () => {
//       const storedMessages =
//         JSON.parse(localStorage.getItem("contactMessages")) || [];
//       setMessages(storedMessages);
//     };
//     loadMessages();
//     window.addEventListener("storage", loadMessages);
//     return () => window.removeEventListener("storage", loadMessages);
//   }, []);

//   // Message actions
//   const deleteMessage = (id) => {
//     const updatedMessages = messages.filter((msg) => msg.id !== id);
//     localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
//     setMessages(updatedMessages);
//     setSelectedMessage(null); // Deselect message after deletion
//   };

//   const updateStatus = (id, newStatus) => {
//     const updatedMessages = messages.map((msg) =>
//       msg.id === id ? { ...msg, status: newStatus } : msg
//     );
//     localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
//     setMessages(updatedMessages);
//     setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
//   };

//   const handleReply = () => {
//     if (!replyContent.trim()) return;

//     // Add reply to message
//     const updatedMessages = messages.map((msg) =>
//       msg.id === selectedMessage.id
//         ? {
//             ...msg,
//             replies: [
//               ...(msg.replies || []),
//               {
//                 content: replyContent,
//                 date: new Date().toISOString(),
//                 admin: true,
//               },
//             ],
//           }
//         : msg
//     );

//     localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
//     setMessages(updatedMessages);
//     setSelectedMessage(
//       updatedMessages.find((msg) => msg.id === selectedMessage.id)
//     );
//     setReplyContent("");
//   };

//   // Filter messages
//   const filteredMessages = messages.filter(
//     (msg) =>
//       msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       msg.message.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           <FiMail className="text-blue-600" />
//           Customer Support ({messages.length})
//         </h1>
//         <input
//           type="text"
//           placeholder="Search messages..."
//           className="p-2 border rounded-lg w-64"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Messages List */}
//         <div className="lg:col-span-1 space-y-4">
//           {filteredMessages.map((message) => (
//             <div
//               key={message.id}
//               className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all
//                   ${
//                     selectedMessage?.id === message.id
//                       ? "bg-blue-50 border-l-4 border-blue-600"
//                       : "bg-white"
//                   }
//                   hover:bg-blue-50`}
//               onClick={() => setSelectedMessage(message)}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-semibold">{message.name}</h3>
//                   <p className="text-sm text-gray-600 truncate">
//                     {message.message}
//                   </p>
//                 </div>
//                 <span
//                   className={`text-sm px-2 py-1 rounded-full
//                     ${
//                       message.status === "new"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : message.status === "in-progress"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                 >
//                   {message.status}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <p className="text-xs text-gray-500">
//                   {new Date(message.createdAt).toLocaleDateString()}
//                 </p>
//                 {message.replies?.length > 0 && (
//                   <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                     {message.replies.length} replies
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Details */}
//         {selectedMessage ? (
//           <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <button
//                   onClick={() => setSelectedMessage(null)}
//                   className="mb-4 text-gray-600 hover:text-blue-600 flex items-center gap-2"
//                 >
//                   <FiArrowLeft /> Back to list
//                 </button>
//                 <h2 className="text-2xl font-bold">{selectedMessage.name}</h2>
//                 <p className="text-gray-600">{selectedMessage.email}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Received:{" "}
//                   {new Date(selectedMessage.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => deleteMessage(selectedMessage.id)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               </div>
//             </div>

//             <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {selectedMessage.message}
//               </p>
//             </div>

//             {/* Conversation Thread */}
//             <div className="space-y-6">
//               {selectedMessage.replies?.map((reply, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 rounded-lg ${
//                     reply.admin ? "bg-blue-50 ml-4" : "bg-gray-100"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span className="font-semibold">
//                       {reply.admin ? "Admin" : selectedMessage.name}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       {new Date(reply.date).toLocaleString()}
//                     </span>
//                   </div>
//                   <p className="text-gray-700 whitespace-pre-wrap">
//                     {reply.content}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Status Controls */}
//             <div className="my-6 pt-4 border-t border-gray-200">
//               <div className="flex gap-4 mb-6">
//                 <button
//                   onClick={() => updateStatus(selectedMessage.id, "new")}
//                   className={`px-4 py-2 rounded-lg ${
//                     selectedMessage.status === "new"
//                       ? "bg-yellow-100"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <FiAlertCircle className="inline mr-2 text-yellow-600" />
//                   Mark as New
//                 </button>
//                 <button
//                   onClick={() =>
//                     updateStatus(selectedMessage.id, "in-progress")
//                   }
//                   className={`px-4 py-2 rounded-lg ${
//                     selectedMessage.status === "in-progress"
//                       ? "bg-blue-100"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <FiAlertCircle className="inline mr-2 text-blue-600" />
//                   In Progress
//                 </button>
//                 <button
//                   onClick={() => updateStatus(selectedMessage.id, "resolved")}
//                   className={`px-4 py-2 rounded-lg ${
//                     selectedMessage.status === "resolved"
//                       ? "bg-green-100"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <FiCheckCircle className="inline mr-2 text-green-600" />
//                   Resolve
//                 </button>
//               </div>

//               {/* Reply Section */}
//               <div className="pt-4 border-t border-gray-200">
//                 <h3 className="font-semibold mb-3">Send Reply</h3>
//                 <textarea
//                   value={replyContent}
//                   onChange={(e) => setReplyContent(e.target.value)}
//                   className="w-full p-3 border rounded-lg mb-3"
//                   rows="4"
//                   placeholder="Type your response here..."
//                 />
//                 <button
//                   onClick={handleReply}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Send Response
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg text-center text-gray-500">
//             Select a message to view details
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminSupport;

import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiMessageSquare,
} from "react-icons/fi";

const AdminSupport = () => {
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("messages"); // "messages" or "tickets"

  // Load messages and tickets from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedMessages =
        JSON.parse(localStorage.getItem("contactMessages")) || [];
      const storedTickets =
        JSON.parse(localStorage.getItem("supportTickets")) || [];
      setMessages(storedMessages);
      setTickets(storedTickets);
    };
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  // Message actions
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    setSelectedMessage(null);
  };

  const updateMessageStatus = (id, newStatus) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, status: newStatus } : msg
    );
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
  };

  const handleMessageReply = () => {
    if (!replyContent.trim()) return;

    const updatedMessages = messages.map((msg) =>
      msg.id === selectedMessage.id
        ? {
            ...msg,
            replies: [
              ...(msg.replies || []),
              {
                content: replyContent,
                date: new Date().toISOString(),
                admin: true,
              },
            ],
          }
        : msg
    );

    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    setSelectedMessage(
      updatedMessages.find((msg) => msg.id === selectedMessage.id)
    );
    setReplyContent("");
  };

  // Ticket actions
  const deleteTicket = (id) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    setSelectedTicket(null);
  };

  const updateTicketStatus = (id, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
  };

  const handleTicketReply = () => {
    if (!replyContent.trim()) return;

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            replies: [
              ...(ticket.replies || []),
              {
                content: replyContent,
                date: new Date().toISOString(),
                admin: true,
              },
            ],
          }
        : ticket
    );

    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    setSelectedTicket(
      updatedTickets.find((ticket) => ticket.id === selectedTicket.id)
    );
    setReplyContent("");
  };

  // Filter data based on search query
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          {activeTab === "messages" ? (
            <FiMail className="text-blue-600" />
          ) : (
            <FiMessageSquare className="text-blue-600" />
          )}
          {activeTab === "messages" ? "Customer Support" : "Support Tickets"} (
          {activeTab === "messages" ? messages.length : tickets.length})
        </h1>
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="p-2 border rounded-lg w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "messages"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "tickets"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Section */}
        <div className="lg:col-span-1 space-y-4">
          {activeTab === "messages"
            ? filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all
                      ${
                        selectedMessage?.id === message.id
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "bg-white"
                      }
                      hover:bg-blue-50`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{message.name}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {message.message}
                      </p>
                    </div>
                    <span
                      className={`text-sm px-2 py-1 rounded-full
                        ${
                          message.status === "new"
                            ? "bg-yellow-100 text-yellow-800"
                            : message.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {message.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                    {message.replies?.length > 0 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {message.replies.length} replies
                      </span>
                    )}
                  </div>
                </div>
              ))
            : filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all
                      ${
                        selectedTicket?.id === ticket.id
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "bg-white"
                      }
                      hover:bg-blue-50`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{ticket.issue}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {ticket.description}
                      </p>
                    </div>
                    <span
                      className={`text-sm px-2 py-1 rounded-full
                        ${
                          ticket.status === "open"
                            ? "bg-yellow-100 text-yellow-800"
                            : ticket.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    {ticket.replies?.length > 0 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {ticket.replies.length} replies
                      </span>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {/* Details Section */}
        {activeTab === "messages" && selectedMessage ? (
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="mb-4 text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <FiArrowLeft /> Back to list
                </button>
                <h2 className="text-2xl font-bold">{selectedMessage.name}</h2>
                <p className="text-gray-600">{selectedMessage.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Received:{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            {/* Conversation Thread */}
            <div className="space-y-6">
              {selectedMessage.replies?.map((reply, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    reply.admin ? "bg-blue-50 ml-4" : "bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">
                      {reply.admin ? "Admin" : selectedMessage.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(reply.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Status Controls */}
            <div className="my-6 pt-4 border-t border-gray-200">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, "new")}
                  className={`px-4 py-2 rounded-lg ${
                    selectedMessage.status === "new"
                      ? "bg-yellow-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlertCircle className="inline mr-2 text-yellow-600" />
                  Mark as New
                </button>
                <button
                  onClick={() =>
                    updateMessageStatus(selectedMessage.id, "in-progress")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    selectedMessage.status === "in-progress"
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlertCircle className="inline mr-2 text-blue-600" />
                  In Progress
                </button>
                <button
                  onClick={() =>
                    updateMessageStatus(selectedMessage.id, "resolved")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    selectedMessage.status === "resolved"
                      ? "bg-green-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiCheckCircle className="inline mr-2 text-green-600" />
                  Resolve
                </button>
              </div>

              {/* Reply Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Send Reply</h3>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full p-3 border rounded-lg mb-3"
                  rows="4"
                  placeholder="Type your response here..."
                />
                <button
                  onClick={handleMessageReply}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "tickets" && selectedTicket ? (
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="mb-4 text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <FiArrowLeft /> Back to list
                </button>
                <h2 className="text-2xl font-bold">{selectedTicket.issue}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteTicket(selectedTicket.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedTicket.description}
              </p>
            </div>

            {/* Conversation Thread */}
            <div className="space-y-6">
              {selectedTicket.replies?.map((reply, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    reply.admin ? "bg-blue-50 ml-4" : "bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">
                      {reply.admin ? "Admin" : "User"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(reply.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Status Controls */}
            <div className="my-6 pt-4 border-t border-gray-200">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, "open")}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTicket.status === "open"
                      ? "bg-yellow-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlertCircle className="inline mr-2 text-yellow-600" />
                  Mark as Open
                </button>
                <button
                  onClick={() =>
                    updateTicketStatus(selectedTicket.id, "in-progress")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    selectedTicket.status === "in-progress"
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiAlertCircle className="inline mr-2 text-blue-600" />
                  In Progress
                </button>
                <button
                  onClick={() =>
                    updateTicketStatus(selectedTicket.id, "resolved")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    selectedTicket.status === "resolved"
                      ? "bg-green-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FiCheckCircle className="inline mr-2 text-green-600" />
                  Resolve
                </button>
              </div>

              {/* Reply Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Send Reply</h3>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full p-3 border rounded-lg mb-3"
                  rows="4"
                  placeholder="Type your response here..."
                />
                <button
                  onClick={handleTicketReply}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg text-center text-gray-500">
            Select a {activeTab === "messages" ? "message" : "ticket"} to view
            details
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
