import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";
import Spinner from "./Spinner"; // Importing the Spinner component

export default function Header() {
  const { logout } = useContext(AuthContext);
  const { searchTasks } = useContext(TaskContext);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState({ search: false, logout: false });

  const handleSearch = async () => {
    setLoading((prev) => ({ ...prev, search: true }));
    await searchTasks(query);
    setLoading((prev) => ({ ...prev, search: false }));
  };

  const handleLogout = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));
    await logout();
    setLoading((prev) => ({ ...prev, logout: false }));
  };

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
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          onClick={handleSearch}
          disabled={loading.search}
        >
          {loading.search ? <Spinner /> : "🔍 Search"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          onClick={handleLogout}
          disabled={loading.logout}
        >
          {loading.logout ? <Spinner /> : "🚪 Logout"}
        </button>
      </div>
    </header>
  );
}
