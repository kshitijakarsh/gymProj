import React from "react";
import { Navbar } from "../Components";
import boxing from "../assets/images/boxing.jpg";
import strength from "../assets/images/strength.jpeg"
import yoga from "../assets/images/yoga.jpg"
import Footer from "../Components/Footer";

function Programme() {
  return (
    <div>
      <Navbar />
      <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto mb-14 max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">
            Trusted by top fitness experts, elite gyms & dedicated athletes worldwide.
            </h2>
          </div>

          <div class="grid grid-cols-1 mt-12 mb-14 lg:mt-20 gap-y-12 md:grid-cols-3 gap-x-6">
            <div class="md:px-4 lg:px-10">
              <img
                class="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={boxing}
                alt=""
              />
              <h3 class="mt-8 text-xl font-semibold leading-tight text-black">
                Boxing
              </h3>
              <p class="mt-4 text-base text-gray-950">
              Boxing is a sport of strength, speed, and strategy.
              </p>
            </div>

            <div class="md:px-4 lg:px-10">
              <img
                class="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={strength}
                alt=""
              />
              <h3 class="mt-8 text-xl font-semibold leading-tight text-black">
                Strength
              </h3>
              <p class="mt-4 text-base text-gray-950">
              Strength training builds muscle, power, and endurance.
              </p>
            </div>

            <div class="md:px-4 lg:px-10">
              <img
                class="w-full h-full object-cover transition-all duration-300 transform scale-105 group-hover:scale-110"
                src={yoga}
                alt=""
              />
              <h3 class="mt-8 text-xl font-semibold leading-tight text-black">
                Yoga
              </h3>
              <p class="mt-4 text-base text-gray-950">
              Yoga enhances flexibility, balance, and mindfulness.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Programme;
