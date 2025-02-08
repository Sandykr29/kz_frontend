import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Spinner from "../components/Spinner";
import { X, PlusCircle } from "lucide-react";

type TaskFormProps = {
  closeForm: () => void;
};

export default function TaskForm({ closeForm }: TaskFormProps) {
  const { addTask } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await addTask(form);
    setLoading(false);
    closeForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white bg-opacity-90 shadow-xl rounded-2xl p-6 w-full max-w-md transition-all transform scale-95 hover:scale-100">
        
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={closeForm}
          disabled={loading}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 text-center">✨ Add New Task</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter task title..."
              className="w-full p-3 border rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Description Input */}
          <div className="relative">
            <textarea
              placeholder="Enter task description..."
              className="w-full p-3 border rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 resize-none"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
              onClick={closeForm}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? <Spinner /> : <><PlusCircle size={18} /> Add Task</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
