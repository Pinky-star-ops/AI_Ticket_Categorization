import { useEffect, useState } from "react";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../services/ticketApi";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [categoryId, setCategoryId] = useState("");

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // CREATE TICKET
  const handleCreateTicket = async (e) => {
  e.preventDefault();

  try {
    const ticketData = {
      title,
      description,
      priority,
      category_id: categoryId ? Number(categoryId) : null,
    };

    if (editingTicket) {
      await updateTicket(editingTicket.id, ticketData);

      alert("Ticket updated successfully!");
    } else {
      await createTicket(ticketData);

      alert("Ticket created successfully!");
    }

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setCategoryId("");

    setEditingTicket(null);
    setShowForm(false);

    await fetchTickets();

  } catch (error) {
    console.error("Failed to save ticket:", error);
    console.error("Backend response:", error.response?.data);

    alert("Failed to save ticket.");
  }
};

  // DELETE TICKET
  const handleDelete = async (ticketId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTicket(ticketId);

      alert("Ticket deleted successfully!");

      await fetchTickets();
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      console.error("Backend response:", error.response?.data);

      alert("Failed to delete ticket.");
    }
  };
  const handleEdit = (ticket) => {
  setEditingTicket(ticket);

  setTitle(ticket.title);
  setDescription(ticket.description);
  setPriority(ticket.priority);
  setCategoryId(ticket.category_id || "");

  setShowForm(true);
};

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Tickets
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "Create Ticket"}
        </button>

      </div>


      {/* CREATE FORM */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">
  {editingTicket ? "Edit Ticket" : "Create Ticket"}
</h2>

          <form onSubmit={handleCreateTicket}>

            {/* TITLE */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter ticket title"
                required
              />

            </div>


            {/* DESCRIPTION */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Describe the problem"
                rows="4"
                required
              />

            </div>


            {/* PRIORITY */}
            <div className="mb-4">

              <label className="block text-gray-700 mb-2">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>

            </div>


            {/* CATEGORY */}
            <div className="mb-6">

              <label className="block text-gray-700 mb-2">
                Category ID
              </label>

              <input
                type="number"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter category ID"
                required
              />

            </div>


            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              {editingTicket ? "Update Ticket" : "Create Ticket"}
            </button>

          </form>

        </div>
      )}


      {/* TICKETS TABLE */}

      {tickets.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <p className="text-gray-500">
            No tickets found.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">
                  ID
                </th>

                <th className="text-left p-4">
                  Title
                </th>

                <th className="text-left p-4">
                  Priority
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {tickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {ticket.id}
                  </td>

                  <td className="p-4 font-medium">
                    {ticket.title}
                  </td>

                  <td className="p-4">
                    {ticket.priority}
                  </td>

                  <td className="p-4">
                    {ticket.status}
                  </td>

                  <td className="p-4">
                    {ticket.category_id}
                  </td>

                  <td className="p-4">

                    <button
  className="text-blue-600 mr-4 hover:underline"
  onClick={() => handleEdit(ticket)}
>
  Edit
</button>


                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Tickets;