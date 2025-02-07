import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export default function TaskForm({ closeForm }) {
  const { addTask } = useContext(TaskContext);
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(form);
    closeForm();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="block w-full p-2 border rounded mb-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="block w-full p-2 border rounded mb-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">Add Task</button>
          <button type="button" className="bg-red-500 text-white px-3 py-2 ml-2 rounded" onClick={closeForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
