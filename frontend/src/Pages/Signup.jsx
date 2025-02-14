import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    budget: "",
    programme: "",
    gymEnrolled: false,
    pfp: "",
    agree: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(imgUrl);
      setFormData((prevData) => ({
        ...prevData,
        pfp: imgUrl,
      }));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure pfp stores only the image URL, not the File object
    const finalFormData = {
      ...formData,
      pfp: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-8 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Create free account
            </h2>
          </div>

          <div className="relative max-w-md mx-auto mt-8 md:mt-10">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email to get started"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Budget
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Enter your budget"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Programme
                      </label>
                      <input
                        type="text"
                        name="programme"
                        value={formData.programme}
                        onChange={handleChange}
                        placeholder="Enter your programme"
                        className="block w-full py-3 pl-3 pr-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-base font-medium text-gray-900">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full py-2 pl-3 pr-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none"
                      />
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Profile Preview"
                          className="mt-3 w-24 h-24 rounded-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="gymEnrolled"
                        checked={formData.gymEnrolled}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-500 border-gray-200 rounded"
                      />
                      <label className="ml-3 text-sm text-gray-500">
                        I'm enrolled in a gym
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-4 text-white bg-slate-950 rounded-md hover:bg-slate-900"
                    >
                      Create account
                    </button>
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

export default Signup;
