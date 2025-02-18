import React from "react";
import boxing from "../assets/images/boxing.jpg";
import strength from "../assets/images/strength.jpeg"
import yoga from "../assets/images/yoga.jpg"
import Footer from "./Footer";

function Programs() {
  return (
    <>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
              programs we offer
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-950">
              Build strength, boost endurance, and enhance flexibility with
              expert-led training, boxing & HIIT, yoga, and personalized
              coaching for your ultimate transformation.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
            {/** Card 1 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={boxing}
                alt="Person 1"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold">BOXING</h3>
              </div>
            </div>

            {/** Card 2 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={strength}
                alt="Person 2"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold">STRENGTH</h3>
              </div>
            </div>

            {/** Card 3 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={yoga}
                alt="Person 3"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold">
                  YOGA
                </h3>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 text-center md:mt-16">
            <a
              href="/programs"
              className="inline-flex items-center justify-center py-4 font-semibold text-white transition-all duration-500 ease-in-out transform hover:scale-105 bg-slate-950 border border-transparent rounded-md px-14 hover:bg-slate-950 focus:bg-slate-950"
              role="button"
            >
              explore more
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Programs;
