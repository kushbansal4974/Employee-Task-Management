import API from "./axios";

export const createTask = (taskData) =>
  API.post("/tasks/create", taskData);

export const getAllTasks = () =>
  API.get("/tasks/all");

export const getMyTasks = () =>
  API.get("/tasks/my");

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);