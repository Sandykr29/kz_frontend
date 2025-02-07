import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const { searchTasks } = useContext(TaskContext);
  const [query, setQuery] = useState("");

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">KZT</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded bg-white text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-gray-200 text-black px-3 py-1 rounded" onClick={() => searchTasks(query)}>
          Search
        </button>
        <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
