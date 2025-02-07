import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";

export default function AuthForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState<string | null>(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(null); // Clear message when toggling form
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = isLogin ? "/auth/login" : "/auth/register";

    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await axios.post(url, payload);
      login(res.data.token, res.data.username);
      setMessage("Successfully logged in!");
    } catch (error) {
      const errMsg = (error as any)?.response?.data?.message || "An error occurred";
      setMessage(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">{isLogin ? "Login" : "Register"}</h2>
      <p className="text-gray-500 text-center cursor-pointer" onClick={toggleForm}>
        {isLogin ? "New User? Register Here" : "Already have an account? Login"}
      </p>
      {message && <p className="text-center text-red-500 mt-2">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            className="block w-full p-3 border rounded mb-3 bg-white text-gray-800"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="block w-full p-3 border rounded mb-3 bg-white text-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="block w-full p-3 border rounded mb-3 bg-white text-gray-800"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
