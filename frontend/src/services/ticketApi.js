import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET tickets with optional filters
export const getTickets = async (filters = {}) => {
  const response = await axios.get(
    `${API_URL}/tickets/`,
    {
      ...getAuthHeaders(),
      params: {
        search: filters.search || undefined,
        category_id: filters.category_id || undefined,
        priority: filters.priority || undefined,
        status_filter: filters.status_filter || undefined,
        start_date: filters.start_date || undefined,
        end_date: filters.end_date || undefined,
      },
    }
  );

  return response.data;
};

// GET single ticket
export const getTicket = async (ticketId) => {
  const response = await axios.get(
    `${API_URL}/tickets/${ticketId}`,
    getAuthHeaders()
  );

  return response.data;
};

// CREATE ticket
export const createTicket = async (ticketData) => {
  const response = await axios.post(
    `${API_URL}/tickets/`,
    ticketData,
    getAuthHeaders()
  );

  return response.data;
};

// UPDATE ticket
export const updateTicket = async (ticketId, ticketData) => {
  const response = await axios.put(
    `${API_URL}/tickets/${ticketId}`,
    ticketData,
    getAuthHeaders()
  );

  return response.data;
};

// DELETE ticket
export const deleteTicket = async (ticketId) => {
  const response = await axios.delete(
    `${API_URL}/tickets/${ticketId}`,
    getAuthHeaders()
  );

  return response.data;
};