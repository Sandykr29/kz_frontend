import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/api";
import { AuthContext } from "./AuthContext";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean; // ✅ Fixed boolean type
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "_id">) => Promise<void>; // ✅ Accept task without `_id`
  updateTask: (taskId: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  sortTasks: (completed: boolean) => Promise<void>; // ✅ Sort using `completed`
  searchTasks: (query: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  sortTasks: async () => {},
  searchTasks: async () => {},
});

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, token } = useContext(AuthContext)!;

  useEffect(() => {
    if (user && token) fetchTasks();
  }, [user, token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("tasks/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task: Omit<Task, "_id">) => {
    try {
      const res = await axios.post("tasks/tasks", task);
      setTasks([...tasks, res.data]); // ✅ `_id` comes from the backend response
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
      const res = await axios.put(`tasks/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`tasks/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const sortTasks = async (completed: boolean) => {
    try {
      const res = await axios.get(`tasks/tasks?status=${completed?"completed":"pending"}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error sorting tasks:", error);
    }
  };

  const searchTasks = async (query: string) => {
    try {
      const res = await axios.get(`tasks/tasks?search=${query}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        sortTasks,
        searchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
