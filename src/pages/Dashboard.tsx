import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import Spinner from "../components/Spinner";
import { PlusCircle, Filter } from "lucide-react";

export default function Dashboard() {
  const { tasks, sortTasks, updateTask, deleteTask, fetchTasks } = useContext(TaskContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(false);
  const [addTaskLoading, setAddTaskLoading] = useState(false);

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

    setSortLoading(true);
    if (status === "all") {
      await fetchTasks();
    } else {
      await sortTasks(status === "completed");
    }
    setSortLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Header />

      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">Your Task Manager</h1>
        <p className="text-lg md:text-xl opacity-90 mt-2">Organize, prioritize, and accomplish your goals efficiently.</p>
      </div>

      {/* Sort & Add Task Section */}
      <div className="flex justify-between items-center mt-6 bg-white shadow-md p-4 rounded-lg">
        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Filter size={20} className="text-blue-500" />
            <select
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer"
              disabled={sortLoading}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Spinner for Sorting */}
          {sortLoading && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Spinner />
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          onClick={() => {
            setAddTaskLoading(true);
            setTimeout(() => {
              setShowTaskForm(true);
              setAddTaskLoading(false);
            }, 500);
          }}
          disabled={addTaskLoading}
        >
          {addTaskLoading ? <Spinner /> : <><PlusCircle size={20} /> Add Task</>}
        </button>
      </div>

      {/* Loading State for Tasks */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-full text-gray-600 mt-10">
              <img src="/no-tasks.svg" alt="No tasks" className="w-40 h-40 opacity-80" />
              <p className="text-lg font-medium mt-4">
                No tasks available. <br /> Start by adding your first task!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && <TaskForm closeForm={() => setShowTaskForm(false)} />}
    </div>
  );
}
