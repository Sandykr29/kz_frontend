import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const { tasks, sortTasks, updateTask, deleteTask, fetchTasks } = useContext(TaskContext);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    if (status === "all") {
      fetchTasks();
    } else {
      sortTasks(status === "completed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select onChange={handleSortChange} className="p-2 border rounded">
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowTaskForm(true)}>
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks?.map((task) => (
          <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
      {showTaskForm && <TaskForm closeForm={() => setShowTaskForm(false)} />}
    </div>
  );
}
