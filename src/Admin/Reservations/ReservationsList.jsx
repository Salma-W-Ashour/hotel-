import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([
    { id: 1, name: "John Doe", date: "2025-02-20", status: "Confirmed" },
    { id: 2, name: "Jane Smith", date: "2025-02-22", status: "Pending" },
    { id: 3, name: "Michael Brown", date: "2025-02-25", status: "Cancelled" },
  ]);

  const [newReservation, setNewReservation] = useState({
    name: "",
    date: "",
    status: "Pending",
  });

  const [editing, setEditing] = useState(null);

  const handleAddReservation = () => {
    if (!newReservation.name || !newReservation.date) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = {
      id: reservations.length + 1,
      ...newReservation,
    };
    setReservations([...reservations, newEntry]);
    setNewReservation({ name: "", date: "", status: "Pending" });
  };

  const handleEditReservation = (id) => {
    const res = reservations.find((r) => r.id === id);
    setEditing(res);
  };

  const handleUpdateReservation = () => {
    setReservations(
      reservations.map((res) => (res.id === editing.id ? editing : res))
    );
    setEditing(null);
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter((res) => res.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Manage Reservations
      </h2>

      {/* Form for Adding & Editing */}
      <div className="mb-6 p-4 bg-white shadow rounded dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
          {editing ? "Edit Reservation" : "Add New Reservation"}
        </h3>
        <input
          type="text"
          placeholder="Guest Name"
          value={editing ? editing.name : newReservation.name}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, name: e.target.value })
              : setNewReservation({ ...newReservation, name: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={editing ? editing.date : newReservation.date}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, date: e.target.value })
              : setNewReservation({ ...newReservation, date: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        />
        <select
          value={editing ? editing.status : newReservation.status}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, status: e.target.value })
              : setNewReservation({ ...newReservation, status: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {editing ? (
          <button
            onClick={handleUpdateReservation}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700"
          >
            Update Reservation
          </button>
        ) : (
          <button
            onClick={handleAddReservation}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-green-700"
          >
            <FaPlus className="inline-block mr-2" /> Add Reservation
          </button>
        )}
      </div>

      {/* Reservations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res.id} className="text-center dark:text-white">
                  <td className="p-3 border">{res.id}</td>
                  <td className="p-3 border">{res.name}</td>
                  <td className="p-3 border">{res.date}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded ${
                        res.status === "Confirmed"
                          ? "bg-green-500 text-white"
                          : res.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleEditReservation(res.id)}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteReservation(res.id)}
                      className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center dark:text-white">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;
