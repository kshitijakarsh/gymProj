import React, { useState } from "react";
import axios from "axios";
import userBg from "../assets/images/userBg.jpg";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    budget: "",
    programme: "",
    gymEnrolled: false, // Corrected this
  });

  const options = ["Cardio", "Weightlifting", "Yoga", "CrossFit", "Zumba"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let selectedOptions = formData.programme
      ? formData.programme.split(",")
      : [];

    if (checked) {
      selectedOptions.push(value);
    } else {
      selectedOptions = selectedOptions.filter((option) => option !== value);
    }

    setFormData((prevData) => ({
      ...prevData,
      programme: selectedOptions.join(","), // Store as comma-separated string
    }));
  };

  const handleGymCheckbox = () => {
    setFormData((prevData) => ({
      ...prevData,
      gymEnrolled: !prevData.gymEnrolled, // Properly updating state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/signup", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        location: "",
        budget: "",
        programme: "",
        gymEnrolled: false,
      });
    } catch (err) {
      alert("Something went wrong, Please try again!");
    }
  };

  return (
    <div>
      <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full"
            src={userBg}
            alt="Background"
          />
        </div>
        <div className="absolute inset-0 bg-gray-900/20"></div>

        <div className="relative max-w-lg px-4 mx-auto sm:px-0">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create an account
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  Already joined?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:underline hover:text-blue-700"
                  >
                    Sign in now
                  </a>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <InputField
                  label="First & Last Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <InputField
                  label="Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                />

                {/* Programme Checkboxes */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Programmes
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={(formData.programme || "")
                            .split(",")
                            .includes(option)}
                          onChange={handleCheckboxChange}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gym Enrolled Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="gymEnrolled"
                    checked={formData.gymEnrolled}
                    onChange={handleGymCheckbox}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-700 font-medium cursor-pointer">
                    enrolled in gym?
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="max-w-xs mx-auto mt-5 text-sm text-center text-gray-600">
                <a
                  href="#"
                  className="text-blue-600 hover:underline hover:text-blue-700"
                >
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline hover:text-blue-700"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable InputField Component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="text-base font-medium text-gray-900">{label}</label>
    <div className="mt-2.5">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
        required
      />
    </div>
  </div>
);

export default Signup;
