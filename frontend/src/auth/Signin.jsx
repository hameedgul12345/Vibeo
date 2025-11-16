import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { serverURl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverURl}/api/auth/signin`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setUserData(response.data.user));
        navigate("/"); // redirect after successful signin
      }

      console.log("Signin success:", response.data);
    } catch (error) {
      console.error("Signin error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signin failed!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#090F1B] text-white">
      <div className="flex w-[850px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">
        {/* Left Form Section */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Sign In to{" "}
            <span className="text-black font-bold italic">Vibeo</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Floating Label Input */}
            {[{ name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" }].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-black px-4 py-3 rounded-md text-sm peer focus:outline-none focus:border-black"
                  placeholder=" "
                />
                <label
                  className="absolute left-4 top-3 text-gray-500 text-sm bg-white px-1 transition-all duration-200
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black"
                >
                  {field.label}
                </label>
              </div>
            ))}

            {/* Forgot Password Link */}
            <div className="text-right -mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all mt-2"
            >
              Sign In
            </button>

            <p className="text-center text-sm mt-2">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Right Branding Section */}
        <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-6 rounded-tl-[40px] rounded-bl-[40px] shadow-2xl">
          <h1 className="text-5xl font-extrabold italic tracking-wide">VIBEO</h1>
          <p className="text-sm mt-4 text-gray-300 text-center">
            Not Just A Platform, It’s A{" "}
            <span className="font-semibold">VIBEO</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
