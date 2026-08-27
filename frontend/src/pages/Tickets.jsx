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

  // Ticket form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [categoryId, setCategoryId] = useState("");

  // Filter states
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // FETCH TICKETS
  const fetchTickets = async () => {
    try {
      const filters = {
        search,
        category_id: filterCategory,
        priority: filterPriority,
        status_filter: filterStatus,
        start_date: startDate,
        end_date: endDate,
      };

      const data = await getTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      console.error("Backend response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTickets();
  }, []);

  // APPLY FILTERS
  const handleApplyFilters = async () => {
    setLoading(true);
    await fetchTickets();
  };

  // CLEAR FILTERS
  const handleClearFilters = async () => {
    setSearch("");
    setFilterCategory("");
    setFilterPriority("");
    setFilterStatus("");
    setStartDate("");
    setEndDate("");

    setLoading(true);

    try {
      const data = await getTickets({});
      setTickets(data);
    } catch (error) {
      console.error("Failed to clear filters:", error);
      console.error("Backend response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // CREATE / UPDATE TICKET
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

  // EDIT TICKET
  const handleEdit = (ticket) => {
    setEditingTicket(ticket);

    setTitle(ticket.title);
    setDescription(ticket.description);
    setPriority(ticket.priority);
    setCategoryId(ticket.category_id || "");

    setShowForm(true);
  };

  // CANCEL FORM
  const handleCancelForm = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setCategoryId("");

    setEditingTicket(null);
    setShowForm(false);
  };

  // PRIORITY BADGE
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-700";

      case "HIGH":
        return "bg-orange-100 text-orange-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      case "LOW":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // STATUS BADGE
  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-100 text-blue-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CLOSED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="spinner mb-4"></div>

          <p className="text-gray-500">
            Loading tickets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Tickets
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and track support tickets
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              setShowForm(true);
            }
          }}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {showForm ? "Cancel" : "+ Create Ticket"}
        </button>

      </div>


      {/* SEARCH & FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
          Search & Filters
        </h2>

        {/* SEARCH */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* FILTER ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <input
              type="number"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              placeholder="Category ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* PRIORITY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>


          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="OPEN">Open</option>
              <option value="PENDING">Pending</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>


          {/* START DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>


        {/* END DATE */}
        <div className="mt-4 max-w-full sm:max-w-xs">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* FILTER BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          <button
            onClick={handleApplyFilters}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Apply Filters
          </button>

          <button
            onClick={handleClearFilters}
            className="w-full sm:w-auto bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Clear Filters
          </button>

        </div>

      </div>


      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
            {editingTicket ? "Edit Ticket" : "Create Ticket"}
          </h2>

          <form onSubmit={handleCreateTicket}>

            {/* TITLE */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter ticket title"
                required
              />

            </div>


            {/* DESCRIPTION */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the problem"
                rows="4"
                required
              />

            </div>


            {/* PRIORITY */}
            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>

            </div>


            {/* CATEGORY */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category ID
              </label>

              <input
                type="number"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category ID"
                required
              />

            </div>


            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-medium"
            >
              {editingTicket ? "Update Ticket" : "Create Ticket"}
            </button>

          </form>

        </div>
      )}


      {/* TICKETS TABLE */}

      {tickets.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <div className="text-4xl mb-3">
            🎫
          </div>

          <p className="text-gray-600 font-medium">
            No tickets found.
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Try changing your filters or create a new ticket.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {/* Horizontal scroll on smaller screens */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    ID
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Title
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Priority
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {tickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="p-4 text-gray-600">
                      {ticket.id}
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      {ticket.title}
                    </td>

                    <td className="p-4">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>

                    </td>

                    <td className="p-4 text-gray-600">
                      {ticket.category_id}
                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-4">

                        <button
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          onClick={() => handleEdit(ticket)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-600 hover:text-red-800 hover:underline font-medium"
                          onClick={() => handleDelete(ticket.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tickets;