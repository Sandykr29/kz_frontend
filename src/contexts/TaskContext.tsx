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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (task: Task) => {
    const res = await axios.post("/tasks", task);
    setTasks([...tasks, res.data]);
  };

  const searchTasks = async (query: string) => {
    const res = await axios.get(`/tasks?search=${query}`);
    setTasks(res.data);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, searchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
