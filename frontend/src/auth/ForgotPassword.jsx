import React, { useState } from "react";
import axios from "axios";
import { serverURl } from "../App";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${serverURl}/api/auth/send-otp`, { email });
      setMessage(res.data.message || "OTP sent to your email!");
      setTimeout(() => navigate("/otp-verification", { state: { email } }), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#090F1B] text-white">
      <div className="flex w-[850px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">
        {/* Left Form Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            Enter your registered email, and we’ll send you an OTP to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-black px-4 py-3 rounded-md text-sm peer focus:outline-none focus:border-black"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-3 text-gray-500 text-sm bg-white px-1 transition-all duration-200
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black"
              >
                Email
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            {message && (
              <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
            )}

            <p className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-black font-semibold hover:underline"
              >
                Sign In
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

export default ForgotPassword;
