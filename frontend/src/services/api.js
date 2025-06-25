import axios from "axios";

const baseURL = "/api/todos";
// const baseURL = "http://localhost:5000/api/todos";
// const baseURL = "http://backend-service:5000/api/todos";
// const baseURL = "http://backend-service:5000/api/todos";

export const getTodos = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export const createTodo = async (todo) => {
  const res = await axios.post(baseURL, todo);
  return res.data;
};

export const updateTodo = async (id, data) => {
  const res = await axios.put(`${baseURL}/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${baseURL}/${id}`);
  return res.data;
};
