// import { useState, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import axios from "../utils/api";

// export default function Register({ toggleForm }) {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ username: "", email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("/auth/register", form);
//     login(res.data.token, res.data.username);
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           className="block w-full p-2 border rounded mb-2"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="block w-full p-2 border rounded mb-2"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="block w-full p-2 border rounded mb-2"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
//       </form>
//       <p className="text-blue-500 cursor-pointer mt-2" onClick={toggleForm}>Already have an account? Login</p>
//     </div>
//   );
// }
