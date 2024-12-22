import {Eye , EyeOff } from "lucide-react"
import {useRef , useState } from "react"
import toast from "react-hot-toast"

const SignupPage = () => {
  const formRef = useRef(null);
  const [formData , setformData] = useState({
    fullName : "",
    email : "",
    password : ""
  })
  const [showPassword, setshowPassword] = useState(false);
  
  
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div
        ref={formRef}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border-t-4 border-orange-400"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-orange-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-orange-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-orange-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password" }
              id="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
            />
            <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-[580px] mt-[148px] flex items-center"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 " />
                  )}
                </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-orange-600">
          Already have an account? <a href="/login" className="font-bold underline">Log in</a>
        </p>
      </div>
    </div>
  );
};


export default SignupPage;