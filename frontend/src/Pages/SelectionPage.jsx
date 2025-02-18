import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function SelectionPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="py-8 h-screen bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Choose Your Role
            </h2>
            <p className="mt-4 text-lg text-gray-950">
              Select how you want to proceed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-10">
            {/* Gym Box */}
            <div
              className="relative p-8 bg-white rounded-md shadow-md cursor-pointer transition-all duration-200 hover:shadow-xl border border-gray-200"
              onClick={() => navigate("/gym-signup")}
            >
              <h3 className="text-2xl font-semibold text-black">As a Gym</h3>
              <p className="mt-2 text-gray-950">
                Register as a gym and manage your members.
              </p>
            </div>

            {/* User Box */}
            <div
              className="relative p-8 bg-white rounded-md shadow-md cursor-pointer transition-all duration-200 hover:shadow-xl border border-gray-200"
              onClick={() => navigate("/signup")}
            >
              <h3 className="text-2xl font-semibold text-black">As a User</h3>
              <p className="mt-2 text-gray-950">
                Sign up as a user to track workouts and progress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SelectionPage;