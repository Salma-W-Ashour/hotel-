// import { useState, useMemo, useCallback } from "react";
// import { useTable } from "react-table";
// import { motion } from "framer-motion";
// import { Dialog } from "@headlessui/react";

// const UsersList = () => {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "123-456-7890",
//       role: "Admin",
//       createdAt: "2023-10-01",
//       status: "Active",
//       avatar: "https://i.pravatar.cc/50?u=1",
//       location: "New York, USA",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "987-654-3210",
//       role: "User",
//       createdAt: "2023-09-15",
//       status: "Pending",
//       avatar: "https://i.pravatar.cc/50?u=2",
//       location: "London, UK",
//     },
//   ]);

//   const [selectedUser, setSelectedUser] = useState(null);

//   const deleteUser = useCallback((id) => {
//     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//   }, []);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Avatar",
//         accessor: "avatar",
//         Cell: ({ row }) => (
//           <img
//             src={row.original.avatar}
//             alt="avatar"
//             className="w-10 h-10 rounded-full"
//           />
//         ),
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//       },
//       {
//         Header: "Email",
//         accessor: "email",
//       },
//       {
//         Header: "Phone",
//         accessor: "phone",
//       },
//       {
//         Header: "Role",
//         accessor: "role",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ row }) => (
//           <span
//             className={`px-2 py-1 rounded-md text-white ${
//               row.original.status === "Active"
//                 ? "bg-green-500"
//                 : row.original.status === "Pending"
//                 ? "bg-yellow-500"
//                 : "bg-red-500"
//             }`}
//           >
//             {row.original.status}
//           </span>
//         ),
//       },
//       {
//         Header: "Location",
//         accessor: "location",
//       },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="flex gap-2">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-md"
//               onClick={() => setSelectedUser(row.original)}
//             >
//               View
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-3 py-1 bg-red-500 text-white rounded-md shadow-md"
//               onClick={() => deleteUser(row.original.id)}
//             >
//               Delete
//             </motion.button>
//           </div>
//         ),
//       },
//     ],
//     [deleteUser]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data: users,
//     });

//   return (
//     <div className="max-w-8xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
//         Users List
//       </h2>
//       <motion.table
//         {...getTableProps()}
//         className="w-full border-collapse border border-gray-300 shadow-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <thead className="bg-gray-200">
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps()}
//                   className="px-4 py-2 text-left border border-gray-300"
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.length > 0 ? (
//             rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <motion.tr
//                   {...row.getRowProps()}
//                   whileHover={{ backgroundColor: "#f9f9f9" }}
//                   className="border border-gray-300"
//                 >
//                   {row.cells.map((cell) => (
//                     <td
//                       {...cell.getCellProps()}
//                       className="px-4 py-2 border border-gray-300"
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </motion.tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={8} className="text-center py-4 text-gray-500">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </motion.table>

//       {/* Modal for User Details */}
//       {selectedUser && (
//         <Dialog open={true} onClose={() => setSelectedUser(null)}>
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h3 className="text-lg font-semibold mb-4">User Details</h3>
//               <p>
//                 <strong>Name:</strong> {selectedUser.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {selectedUser.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {selectedUser.phone}
//               </p>
//               <p>
//                 <strong>Role:</strong> {selectedUser.role}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedUser.status}
//               </p>
//               <p>
//                 <strong>Location:</strong> {selectedUser.location}
//               </p>
//               <button
//                 className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
//                 onClick={() => setSelectedUser(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default UsersList;

import React, { useState, useMemo, useCallback } from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    user || {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      role: "User",
      status: "Active",
      location: "",
      avatar: `https://i.pravatar.cc/50?u=${Date.now()}`,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">
            {user ? "Edit User" : "Add User"}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const saveUser = (user) => {
    setUsers((prevUsers) => {
      const exists = prevUsers.find((u) => u.id === user.id);
      return exists
        ? prevUsers.map((u) => (u.id === user.id ? user : u))
        : [...prevUsers, user];
    });
  };

  const deleteUser = useCallback((id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: ({ row }) => (
          <img
            src={row.original.avatar}
            className="w-10 h-10 rounded-full"
            alt="avatar"
          />
        ),
      },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-green-500 text-white rounded-md"
              onClick={() => {
                setSelectedUser(row.original);
                setIsFormOpen(true);
              }}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => deleteUser(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [deleteUser]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Users List</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsFormOpen(true)}
        >
          Add User
        </button>
      </div>
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-300"
      >
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border border-gray-300"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border border-gray-300">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSave={saveUser}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersList;
