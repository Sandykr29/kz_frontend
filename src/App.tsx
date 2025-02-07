import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./components/AuthForm";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}
