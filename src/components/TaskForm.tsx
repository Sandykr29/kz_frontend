import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

type TaskFormProps = {
  closeForm: () => void;
};

export default function TaskForm({ closeForm }: TaskFormProps) {
  const { addTask } = useContext(TaskContext);

  // ✅ Ensure `completed` is present instead of `status`
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false, // ✅ Corrected field
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTask(form); // ✅ Now it matches the expected `Task` structure
    closeForm();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="block w-full p-2 border rounded mb-2 bg-white text-gray-800"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="block w-full p-2 border rounded mb-2 bg-white text-gray-800"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          {/* ✅ Dropdown controls `completed` instead of `status` */}
          <select
            value={form.completed ? "completed" : "pending"}
            onChange={(e) =>
              setForm({ ...form, completed: e.target.value === "completed" })
            }
            className="block w-full p-2 border rounded mb-2 bg-white text-gray-800"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded">
            Add Task
          </button>
          <button type="button" className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 ml-2 rounded" onClick={closeForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
