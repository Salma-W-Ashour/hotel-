import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ServicesList = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Spa Treatment", price: 50, status: "Available" },
    { id: 2, name: "Room Cleaning", price: 20, status: "Available" },
    { id: 3, name: "Laundry Service", price: 15, status: "Unavailable" },
  ]);

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    status: "Available",
  });

  const [editing, setEditing] = useState(null);

  const handleAddService = () => {
    if (!newService.name || !newService.price) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = {
      id: services.length + 1,
      ...newService,
      price: parseFloat(newService.price),
    };
    setServices([...services, newEntry]);
    setNewService({ name: "", price: "", status: "Available" });
  };

  const handleEditService = (id) => {
    const service = services.find((s) => s.id === id);
    setEditing(service);
  };

  const handleUpdateService = () => {
    setServices(
      services.map((service) =>
        service.id === editing.id ? editing : service
      )
    );
    setEditing(null);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Manage Services
      </h2>

      {/* Form for Adding & Editing */}
      <div className="mb-6 p-4 bg-white shadow rounded dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-white">
          {editing ? "Edit Service" : "Add New Service"}
        </h3>
        <input
          type="text"
          placeholder="Service Name"
          value={editing ? editing.name : newService.name}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, name: e.target.value })
              : setNewService({ ...newService, name: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={editing ? editing.price : newService.price}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, price: e.target.value })
              : setNewService({ ...newService, price: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        />
        <select
          value={editing ? editing.status : newService.status}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, status: e.target.value })
              : setNewService({ ...newService, status: e.target.value })
          }
          className="p-2 border rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        {editing ? (
          <button
            onClick={handleUpdateService}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700"
          >
            Update Service
          </button>
        ) : (
          <button
            onClick={handleAddService}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-green-700"
          >
            <FaPlus className="inline-block mr-2" /> Add Service
          </button>
        )}
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price ($)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service.id} className="text-center dark:text-white">
                  <td className="p-3 border">{service.id}</td>
                  <td className="p-3 border">{service.name}</td>
                  <td className="p-3 border">${service.price}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded ${
                        service.status === "Available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleEditService(service.id)}
                      className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
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
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesList;
