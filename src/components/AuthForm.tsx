import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";
import Spinner from "./Spinner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function AuthForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle between login and registration
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setForm({ email: "", password: "", username: "" }); // Reset form fields on toggle
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = isLogin ? "/auth/login" : "/auth/register";
    const payload = isLogin ? { email: form.email, password: form.password } : form;

    try {
      setMessage({ text: "Authenticating... Please wait.", type: "info" });
      setIsLoading(true);

      const res = await axios.post(url, payload);

      if (isLogin) {
        login(res.data.token, res.data.username);
        setMessage({ text: "✅ Login successful! Redirecting...", type: "success" });
        setTimeout(() => {
          setForm({ email: "", password: "", username: "" }); // Reset form
          navigate("/dashboard"); // Redirect to dashboard
        }, 1500);
      } else {
        setMessage({ text: "✅ Registration successful! Redirecting to login...", type: "success" });
        setTimeout(() => {
          setIsLogin(true);
          setForm({ email: "", password: "", username: "" }); // Reset form
          setMessage(null);
        }, 1500);
      }
      
    } catch (error) {
      const errMsg = (error as any)?.response?.data?.message || "⚠️ Something went wrong. Please try again.";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">{isLogin ? "Login" : "Register"}</h2>
      <p className="text-gray-500 text-center cursor-pointer underline" onClick={toggleForm}>
        {isLogin ? "New User? Register Here" : "Already have an account? Login"}
      </p>

      {message && (
        <div
          className={`mt-4 p-3 text-sm text-center rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" :
            message.type === "error" ? "bg-red-100 text-red-700" :
            "bg-blue-100 text-blue-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            className="block w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-800"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={isLoading}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="block w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={isLoading}
        />
        
        {/* Password Input with Toggle Visibility */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            className="block w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-800 pr-10"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
