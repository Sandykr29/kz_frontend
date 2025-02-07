import { useState } from "react";

export default function TaskCard({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description, status: task.completed });

  const handleUpdate = async () => {
    await updateTask(task._id, form);
    setIsEditing(false);
  };
console.log(form)
  return (
    <div className={`p-4 drop-shadow-lg rounded ${form.status? "bg-green-100" : "bg-red-100"}`}>
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
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          >
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
          <h3 className="text-xl text-center underline underline-offset-4 mb-4">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">{task.status}</p>
          <div className="flex justify-between items-center mt-4">
  <button
    className="bg-yellow-500 text-white px-4 py-2 rounded"
    onClick={() => setIsEditing(true)}
  >
    Edit
  </button>
  
  <button
    className="bg-red-500 text-white px-4 py-2 rounded"
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
