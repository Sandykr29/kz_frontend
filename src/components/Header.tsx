import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const { searchTasks } = useContext(TaskContext);
  const [query, setQuery] = useState("");

  return (
    <header className="bg-gray-800 p-4 text-white flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-xl font-bold">KZT</h1>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded bg-gray-100 text-gray-800 w-full md:w-auto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded w-full md:w-auto" onClick={() => searchTasks(query)}>
          Search
        </button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded w-full md:w-auto" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
