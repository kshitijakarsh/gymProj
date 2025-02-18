import React, { useState } from "react";
import axios from "axios";
import userBg from "../assets/images/userBg.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  location: z.string().min(2, "Location is required"),
  budget: z.string().regex(/^\d+$/, "Budget must be a valid number"),
  programme: z.string().optional(),
  gymEnrolled: z.boolean(),
});

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      budget: "",
      programme: "",
      gymEnrolled: false,
    },
  });

  const options = ["Cardio", "Weightlifting", "Yoga", "CrossFit", "Zumba"];
  const programmeValue = watch("programme");

  const onSubmit = async (formData) => {
    try {
      const res=await axios.post("http://localhost:3000/api/users/register", formData);
      console.log(res)
      navigate("/");
    } catch (err) {
      alert("Something went wrong, Please try again!");
      console.log("Error is :",err)
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
                <p className="mt-2 text-base text-gray-950">
                  Already joined?{" "}
                  <a
                    href="/login"
                    className="text-red-600 hover:underline hover:text-red-700"
                  >
                    Sign in now
                  </a>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <InputField
                  label="First & Last Name"
                  name="name"
                  register={register}
                  error={errors.name?.message}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  register={register}
                  error={errors.email?.message}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  error={errors.password?.message}
                />
                <InputField
                  label="Location"
                  name="location"
                  register={register}
                  error={errors.location?.message}
                />
                <InputField
                  label="Budget"
                  name="budget"
                  register={register}
                  error={errors.budget?.message}
                />

                {/* Programme Checkboxes */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Programmes
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={option}
                          checked={(programmeValue || "").split(",").includes(option)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            let selectedOptions = programmeValue
                              ? programmeValue.split(",")
                              : [];

                            if (checked) {
                              selectedOptions.push(value);
                            } else {
                              selectedOptions = selectedOptions.filter(
                                (option) => option !== value
                              );
                            }

                            setValue("programme", selectedOptions.join(","), {
                              shouldValidate: true,
                            });
                          }}
                          className="w-5 h-5 text-slate-950 bg-gray-100 border-gray-300 rounded focus:ring-slate-500"
                        />
                        <span className="text-gray-700 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gym Enrolled Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("gymEnrolled")}
                    className="w-5 h-5 text-slate-950 bg-gray-100 border-gray-300 rounded focus:ring-slate-500"
                  />
                  <label className="text-gray-700 font-medium cursor-pointer">
                    Enrolled in gym?
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-4 text-base font-semibold text-white bg-slate-950 rounded-md hover:bg-slate-700 focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="max-w-xs mx-auto mt-5 text-sm text-center text-gray-950">
                <a
                  href="#"
                  className="text-slate-950 hover:underline hover:text-slate-700"
                >
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-slate-950 hover:underline hover:text-slate-700"
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
const InputField = ({ label, name, type = "text", register, error }) => (
  <div>
    <label className="text-base font-medium text-gray-900">{label}</label>
    <div className="mt-2.5">
      <input
        type={type}
        {...register(name)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-slate-950"
        required
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Signup;
