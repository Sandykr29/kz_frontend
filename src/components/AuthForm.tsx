import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";

export default function AuthForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = isLogin ? "/auth/login" : "/auth/register";

    // Dynamically exclude `username` from login requests
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    console.log("Submitting Form Data:", payload);

    const res = await axios.post(url, payload);
    login(res.data.token, res.data.username);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Register"}</h2>
      <p className="text-blue-500 text-center cursor-pointer" onClick={toggleForm}>
        {isLogin ? "New User? Register Here" : "Already have an account? Login"}
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            className="block w-full p-3 border rounded mb-3"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="block w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="block w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
