import React, { useState, useRef } from "react";
import axios from "axios";
import { serverURl } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // ✅ email passed via navigate

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setMessage("Please enter a valid 4-digit OTP.");
      return;
    }

    if (!email) {
      setMessage("Email not found. Please go back and enter your email again.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${serverURl}/api/auth/verify-otp`, {
        email, // ✅ include email
        otp: enteredOtp,
      });
      setMessage(res.data.message || "OTP Verified Successfully!");
      // console.log(res.data.message)
      // Navigate to reset password page, passing email forward
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setMessage("Email not found. Please go back and enter your email again.");
      return;
    }

    try {
      const res = await axios.post(`${serverURl}/api/auth/resend-otp`, {
        email, // ✅ include email here too
      });
      setMessage(res.data.message || "New OTP sent to your email!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#090F1B] text-white">
      <div className="flex w-[850px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Verify OTP
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            Enter the 4-digit code sent to your email.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-2xl border border-black rounded-md focus:outline-none focus:border-black"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-2/3 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all mt-4"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">
                {message}
              </p>
            )}

            <p className="text-center text-sm mt-2">
              Didn’t receive code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-black font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>

        {/* Right Branding */}
        <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-6 rounded-tl-[40px] rounded-bl-[40px] shadow-2xl">
          <h1 className="text-5xl font-extrabold italic tracking-wide">
            VIBEO
          </h1>
          <p className="text-sm mt-4 text-gray-300 text-center">
            Not Just A Platform, It’s A{" "}
            <span className="font-semibold">VIBEO</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
