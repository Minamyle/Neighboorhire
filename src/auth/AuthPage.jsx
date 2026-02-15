import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Mail, Lock, User, Briefcase} from "lucide-react";

export default function AuthPage({initialMode = "login"}) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [role, setRole] = useState(null); // "customer" or "worker"
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const handleToggle = () => {
    const targetMode = !isLogin ? "login" : "register";
    // navigate(`/auth/${targetMode}`); // Optional: navigate immediately or let the state handle it
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, validation and auth check would happen here
    navigate("/dashboard/customer");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role (Customer or Worker) to proceed.");
      return;
    }
    // Redirect based on selected role
    if (role === "worker") {
      navigate("/dashboard/artisan");
    } else {
      navigate("/dashboard/customer");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center font-sans relative p-4"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXXkr0tODRjEfG3tPbzX2awxtNiILqNGT9A&s')",
      }}
    >
      {/* Dark overlay for readability on main background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl min-h-[600px] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Sign Up Form (Register) - Located underneath/visible when active */}
        <div
          className={`absolute top-0 left-0 h-full w-full md:w-1/2 p-10 transition-all duration-700 ease-in-out flex flex-col justify-center items-center bg-white ${
            !isLogin
              ? "opacity-100 z-20 md:translate-x-[100%]"
              : "opacity-0 z-10"
          }`}
        >
          <form
            className="flex flex-col items-center w-full h-full justify-center"
            onSubmit={handleRegister}
          >
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
              Create Account
            </h1>

            {/* Social Icons */}
            <div className="flex gap-4 mb-4">
              {["f", "G", "in"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                >
                  <span className="font-bold">{icon}</span>
                </div>
              ))}
            </div>

            <span className="text-gray-400 text-sm mb-4">
              or use your email for registration
            </span>

            {/* Role Selection */}
            <div className="flex flex-col mb-4 w-full max-w-xs">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                    role === "customer"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <User size={16} className="mr-2" />
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("worker")}
                  className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${
                    role === "worker"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Briefcase size={16} className="mr-2" />
                  Worker
                </button>
              </div>
              {!role && (
                <p className="text-xs text-red-500 mt-1 text-center">
                  * Please select a role
                </p>
              )}
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg">
                <User size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                  required
                />
              </div>
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg">
                <Mail size={18} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                  required
                />
              </div>
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-blue-700 transition transform active:scale-95 shadow-lg"
            >
              Sign Up
            </button>

            <div className="mt-4 md:hidden">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Sign In Form (Login) */}
        <div
          className={`absolute top-0 left-0 h-full w-full md:w-1/2 p-10 transition-all duration-700 ease-in-out flex flex-col justify-center items-center bg-white ${
            isLogin ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <form
            className="flex flex-col items-center w-full h-full justify-center"
            onSubmit={handleLogin}
          >
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Sign In</h1>

            {/* Social Icons */}
            <div className="flex gap-4 mb-6">
              {["f", "G", "in"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                >
                  <span className="font-bold">{icon}</span>
                </div>
              ))}
            </div>

            <span className="text-gray-400 text-sm mb-6">
              or use your email account
            </span>

            <div className="w-full flex flex-col gap-4">
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg">
                <Mail size={20} className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                  required
                />
              </div>
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg">
                <Lock size={20} className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                  required
                />
              </div>
            </div>

            <a href="#" className="text-gray-500 text-sm mt-4 hover:underline">
              Forgot your password?
            </a>

            <button
              type="submit"
              className="mt-8 bg-blue-600 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-blue-700 transition transform active:scale-95 shadow-lg"
            >
              Sign In
            </button>

            <div className="mt-4 md:hidden">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 rounded-l-[100px] ${
            isLogin ? "" : "-translate-x-full rounded-l-none rounded-r-[100px]"
          }`}
        >
          <div
            className={`bg-gradient-to-br from-cyan-600 to-blue-900 text-white h-full w-[200%] absolute top-0 left-[-100%] transition-transform duration-700 ease-in-out flex items-center justify-center ${
              isLogin ? "translate-x-0" : "translate-x-1/2"
            }`}
          >
            {/* Background Image for Overlay with Gradient */}
            <div
              className="absolute inset-0 z-0 opacity-50 bg-cover bg-center mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://cisp.cachefly.net/assets/articles/images/resized/0000285482_resized_indiatraining1022bloomberg.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-cyan-900/40 to-blue-800/60 mix-blend-multiply"></div>

            {/* Left Panel (Visible when Sliding Right -> Show Login Info when Registering) */}
            <div
              className={`w-1/2 h-full flex flex-col items-center justify-center p-10 text-center transform transition-transform duration-700 z-10 ${
                isLogin ? "-translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-8 text-blue-100 leading-relaxed">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={handleToggle}
                className="border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white hover:text-blue-600 transition"
              >
                Sign In
              </button>
            </div>

            {/* Right Panel (Visible when Sliding Left -> Show Register Info when Logging In) */}
            <div
              className={`w-1/2 h-full flex flex-col items-center justify-center p-10 text-center transform transition-transform duration-700 z-10 ${
                isLogin ? "translate-x-0" : "translate-x-[20%]"
              }`}
            >
              <h1 className="text-3xl font-bold mb-4">Join Our Community!</h1>
              <p className="mb-8 text-blue-100 leading-relaxed">
                Whether you're looking for help or looking to work, we have a
                spot for you.
              </p>
              <button
                onClick={handleToggle}
                className="border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white hover:text-blue-600 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle (Hidden on Desktop) */}
      </div>
    </div>
  );
}
