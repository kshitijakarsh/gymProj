import React from "react";
import bench from "../assets/images/hero-image.jpg";

function Hero() {
  return (
    <>
      <div class="px-4 mx-auto mt-20 rounded-md max-w-7xl sm:px-6 lg:px-8">
        <div class="2xl:pl-24">
          <div class="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 2xl:gap-x-20">
            <div class="text-center md:py-16 xl:py-24 md:text-left">
              <blockquote>
                <p class="text-2xl font-semibold leading-relaxed text-grey-950">
                  Connect with like-minded fitness enthusiasts, find the perfect
                  trainer, and build your gym squad. Your fitness journey starts
                  here!
                </p>
              </blockquote>

              <p class="mt-12 text-base text-grey-950 lg:mt-20">
                Want to see bench-press in action?
              </p>
              <a
                href="/main"
                title=""
                class="inline-flex items-center justify-center px-8 py-4 mt-4 text-base font-semibold text-white transition-all duration-500 ease-in-out transform hover:scale-105 bg-black rounded-md hover:opacity-80 focus:opacity-80"
                role="button"
              >
                {" "}
                let's go{" "}
              </a>
            </div>

            <div class="grid place-items-center bg-cover bg-center" style={{ backgroundImage: `url(${bench})` }}>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
