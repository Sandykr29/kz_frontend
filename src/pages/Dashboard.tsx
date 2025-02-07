import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container mx-auto">
      <Header />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
