import React, { useState } from "react";
import axios from "axios";
import { serverURl } from "../App";
import { useNavigate, Link, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get email from OTP page navigation
  const email = location.state?.email;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!email) {
      setMessage("Email is missing. Please verify OTP again.");
      return;
    }

    setLoading(true);
    try {
      // ✅ include email + newPassword in body
      const res = await axios.post(
        `${serverURl}/api/auth/reset-password`,
        {
          email,
          newPassword: formData.password,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password.");
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
            Reset Password
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            Create a strong new password to secure your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {[
              { name: "password", label: "New Password", type: "password" },
              { name: "confirmPassword", label: "Confirm Password", type: "password" },
            ].map((field) => (
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

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
            )}

            <p className="text-center text-sm mt-2">
              Remembered your password?{" "}
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

export default ResetPassword;
