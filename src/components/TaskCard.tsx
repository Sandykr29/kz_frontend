import { useState } from "react";
import Spinner from "../components/Spinner"; // Import Spinner component

// Define Task Type
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Define Props Type
interface TaskCardProps {
  task: Task;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

// Fix TaskCard Function Signature
export default function TaskCard({ task, updateTask, deleteTask }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState({ update: false, delete: false });
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
  });

  const handleUpdate = async () => {
    setLoading({ ...loading, update: true });
    await updateTask(task._id, { ...form });
    setLoading({ ...loading, update: false });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setLoading({ ...loading, delete: true });
    await deleteTask(task._id);
  };

  return (
    <div
      className={`relative p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 ${
        form.completed
          ? "bg-gradient-to-r from-blue-900 to-indigo-700 border-4 border-blue-500 shadow-blue-500/50"
          : "bg-gradient-to-r from-red-900 to-rose-700 border-4 border-red-500 shadow-red-500/50"
      }`}
    >
      {isEditing ? (
        <>
          {/* Edit form */}
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="block w-full p-3 border rounded mb-2 shadow-sm focus:ring-2 focus:ring-indigo-400 text-gray-900 bg-gray-100"
            disabled={loading.update}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="block w-full p-3 border rounded mb-2 shadow-sm focus:ring-2 focus:ring-indigo-400 text-gray-900 bg-gray-100"
            disabled={loading.update}
          />
          <select
            value={form.completed ? "completed" : "pending"}
            onChange={(e) =>
              setForm({ ...form, completed: e.target.value === "completed" })
            }
            className="block w-full p-3 border rounded mb-2 shadow-sm focus:ring-2 focus:ring-indigo-400 text-gray-900 bg-gray-100"
            disabled={loading.update}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-3 mt-2">
            {/* Save Button */}
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              onClick={handleUpdate}
              disabled={loading.update}
            >
              {loading.update ? <Spinner /> : "✅ Save"}
            </button>

            {/* Cancel Button */}
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsEditing(false)}
              disabled={loading.update}
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-200">{task.title}</h3>
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                form.completed ? "bg-cyan-300 shadow-md shadow-cyan-500/50" : "bg-rose-300 shadow-md shadow-rose-500/50"
              }`}
            ></div>
          </div>
          <p className="text-gray-300 mt-2">{task.description}</p>
          <p className="text-sm font-medium text-gray-400 italic mt-1">
            Status: <span className="font-semibold">{form.completed ? "✔ Completed" : "⏳ Pending"}</span>
          </p>

          {/* Edit and Delete buttons */}
          <div className="flex justify-between items-center mt-4">
            {/* Edit Button */}
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-lg border-2 border-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => setIsEditing(true)}
              disabled={loading.update || loading.delete}
            >
              ✏ Edit
            </button>

            {/* Delete Button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg border-2 border-red-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              onClick={handleDelete}
              disabled={loading.delete}
            >
              {loading.delete ? <Spinner /> : "🗑 Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
