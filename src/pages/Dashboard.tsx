import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";


export default function Dashboard() {
  const { tasks, sortTasks, updateTask, deleteTask, fetchTasks } = useContext(TaskContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      await fetchTasks();
      setLoading(false);
    };
    loadTasks();
  }, []);

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    setLoading(true); 
    if (status === "all") {
      await fetchTasks();
    } else {
      await sortTasks(status === "completed");
    }
    setLoading(false); 
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
      <div>
  <select 
    onChange={handleSortChange} 
    className="p-2 border border-blue-500 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer"
  >
    <option value="all" className="text-black">All Tasks</option>
    <option value="completed" className="text-black">Completed</option>
    <option value="pending" className="text-black">Pending</option>
  </select>
</div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowTaskForm(true)}>
          Add Task
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-2xl md:text-3xl lg:text-4xl font-semibold animate-pulse">
        Loading tasks...
      </p>
      
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />)
          ) : (
          
  <p className="text-center text-gray-500 text-2xl md:text-3xl lg:text-4xl font-semibold animate-pulse">
    No tasks available. Kindly refresh or create a new task...
  </p>


          )}
        </div>
      )}

      {showTaskForm && <TaskForm closeForm={() => setShowTaskForm(false)} />}
    </div>
  );
}
