import { useState } from "react";

export default function TaskCard({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description, completed: task.completed });

  const handleUpdate = async () => {
    const updatedForm = {
      ...form,
      completed: form.completed === "completed"
    };
    await updateTask(task._id, updatedForm);
    setIsEditing(false);
  };

  return (
    <div className={`p-4 drop-shadow-lg rounded ${form.completed ? "bg-green-300 border-3 border-green-500" : "bg-red-300 border-3 border-red-500"}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <select
            value={form.completed}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, completed: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          >
            <option >--select--</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
            Save
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
        <div className="flex justify-between items-center">
        <h3 className="text-xl text-center underline underline-offset-4 mb-4">{task.title}</h3>
          <div
        className={`w-2 h-2 rounded-full ${
          form.completed ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      </div>
          
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">{task.status}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded border-3 border-yellow-600"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded border-3 border-red-600"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
