
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div
      className="bg-[url(https://indoafrica.allegiance-educare.in/storage/uploads/colleges/1662553710campus3.jpg)] bg-cover bg-center bg-no-repeat min-h-screen"
    >
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpYSvMsPQyQevro0rOritlsYIUeSkl4iEgng&s"
          alt="Canteen logo"
          className="w-10 md:w-52 mix-blend-multiply"
        />
        <Link to={"/signup"} className="text-white bg-orange-500 py-1 px-2 rounded">
          Sign up
        </Link>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to VES canteen
        </h1>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          
           <button className="bg-orange-500 text-xl lg:text-2xl px-6 py-2 rounded flex items-center ml-[200px]">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;