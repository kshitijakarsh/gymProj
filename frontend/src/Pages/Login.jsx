import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      console.log(response);
      

      if (response.status == 200) {
        navigate(`/dashboard/${response.data.userId}`);
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-8 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Welcome Back!
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-950">
              Login to your account
            </p>
          </div>

          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-950">
                        <input
                          type="email"
                          placeholder="Enter email"
                          className="block w-full py-4 pl-3 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-slate-950"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Password
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-950">
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="block w-full py-4 pl-3 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-slate-950"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-slate-950 border border-transparent rounded-md focus:outline-none hover:bg-slate-950"
                      >
                        Log in
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-base text-slate-950">
                        Don’t have an account?{" "}
                        <a
                          href="/signup"
                          className="font-medium text-red-500 transition-all duration-200 hover:text-red-950 hover:underline"
                        >
                          Create a free account
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
