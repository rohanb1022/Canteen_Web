import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="bg-[url('https://indoafrica.allegiance-educare.in/storage/uploads/colleges/1662553710campus3.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto flex items-center justify-between p-6 md:px-12 w-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpYSvMsPQyQevro0rOritlsYIUeSkl4iEgng&s"
          alt="Canteen Logo"
          className="w-16 md:w-20"
        />
        <Link
          to="/signup"
          className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-md text-sm md:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 ml-auto"
        >
          Sign Up
        </Link>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 md:px-8 py-12">
        <div className="bg-black bg-opacity-80 p-10 md:p-12 rounded-lg shadow-lg text-white max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Welcome to <span className="text-orange-500">VES Canteen</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Enjoy a wide variety of meals with exceptional service, right at your fingertips. Start your experience with us today!
          </p>

          <form onSubmit={handleFormSubmit} className="w-full">
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg md:text-xl py-3 rounded-md flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ChevronRight className="ml-3 w-5 h-5" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="text-center text-sm text-white py-6 bg-black bg-opacity-70">
        © {new Date().getFullYear()} VES Canteen. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthScreen;