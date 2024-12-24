import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authUser";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthStore();
  const formRef = useRef(null);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      const loginSuccess = await login(formData); // Validate login
      console.log("Login success:", loginSuccess);
      if (loginSuccess) {
        toast.success("Login successful");
        
        navigate("/home"); // Navigate to homepage upon success
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div
        ref={formRef}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-t-4 border-orange-400"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-orange-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setformData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-orange-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setformData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-orange-600">
          Are you new?{" "}
          <a href="/signup" className="font-bold underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
