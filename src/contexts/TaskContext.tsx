import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/api";
import { AuthContext } from "./AuthContext";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (user && token) fetchTasks();
  }, [user, token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const res = await axios.post("/tasks/tasks", task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const searchTasks = async (query: string) => {
    try {
      const res = await axios.get(`/tasks/tasks?search=${query}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, searchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
