

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { serverURl } from "../App";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";
// import axios from "axios";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     userName: "",
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${serverURl}/api/auth/signup`, formData, {
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         dispatch(setUserData(response.data.user));
//         navigate("/");
//       }

//       console.log("Signup response:", response.data);
//     } catch (error) {
//       console.error("Signup error:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-[#090F1B] text-white">
//       <div className="flex w-[850px] bg-white text-black rounded-2xl shadow-xl overflow-hidden">

//         {/* Left Form Section */}
//         <div className="flex-1 p-10">
//           <h2 className="text-2xl font-semibold mb-8 text-center">
//             Sign Up to <span className="text-black font-bold italic">Vibeo</span>
//           </h2>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">

//             {[
//               { name: "name", label: "Name", type: "text" },
//               { name: "userName", label: "Username", type: "text" },
//               { name: "email", label: "Email", type: "email" },
//               { name: "password", label: "Password", type: "password" },
//             ].map((field) => (
//               <div key={field.name} className="relative">
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   required
//                   placeholder=" "
//                   className="w-full border border-black px-4 py-3 rounded-md text-sm
//                   peer focus:outline-none focus:border-black"
//                 />

//                 <label
//                   className="absolute left-4 top-3 text-gray-500 bg-white px-1 pointer-events-none
//                   transition-all duration-200
//                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
//                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
//                   peer-valid:-top-2 peer-valid:text-xs peer-valid:text-black"
//                 >
//                   {field.label}
//                 </label>
//               </div>
//             ))}

//             <button
//               type="submit"
//               className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
//             >
//               Sign Up
//             </button>

//             <p className="text-center text-sm mt-2">
//               Already have an account?{" "}
//               <Link to="/signin" className="text-black font-semibold hover:underline">
//                 Sign In
//               </Link>
//             </p>
//           </form>
//         </div>

//         {/* Right Branding Section */}
//         <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-6 rounded-tl-[40px] rounded-bl-[40px] shadow-2xl">
//           <h1 className="text-5xl font-extrabold italic tracking-wide">VIBEO</h1>
//           <p className="text-sm mt-4 text-gray-300 text-center">
//             Not Just A Platform, It’s A <span className="font-semibold">VIBEO</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { serverURl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
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
        `${serverURl}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        dispatch(setUserData(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090F1B] px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[850px] bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT / FORM SECTION */}
        <div className="flex-1 p-6 sm:p-8 md:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Sign Up to <span className="font-bold italic">Vibeo</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "userName", label: "Username", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="w-full border border-black px-4 py-3 rounded-md text-sm
                  peer focus:outline-none focus:border-black"
                />

                <label
                  className="absolute left-4 top-3 text-gray-500 bg-white px-1
                  transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs peer-valid:text-black"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-all"
            >
              Sign Up
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT / BRANDING SECTION */}
        <div className="hidden md:flex flex-1 bg-black text-white
                        flex-col items-center justify-center p-6
                        rounded-tl-[40px] rounded-bl-[40px]">
          <h1 className="text-4xl lg:text-5xl font-extrabold italic tracking-wide">
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

export default Signup;
