import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";

export default function Dashboard() {
  const { tasks, sortTasks, updateTask, deleteTask } = useContext(TaskContext);

  return (
    <div className="container mx-auto">
      <Header />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex justify-end space-x-4 mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => sortTasks("completed")}>
          Show Completed
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => sortTasks("pending")}>
          Show Pending
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
}
