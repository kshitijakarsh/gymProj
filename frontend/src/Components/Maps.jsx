import React from "react";
import gymMap from "../assets/images/gymMap.jpg";

function Maps() {
  return (
    <>
      <section class="mt-20 mb-16 py-10 bg-white sm:py-16 lg:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
            <div className="drop-shadow-[2px_4px_6px_rgba(0,0,0,1)] border-10 border-solid transition-all duration-500 ease-in-out transform hover:scale-105 w-fit h-fit">
              <img
                className="w-fit h-fit" // Ensures image keeps its aspect ratio
                src={gymMap}
                alt=""
              />
            </div>

            <div class="text-center lg:text-left">
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                locate gyms near you
              </h2>
              <p class="mt-6 text-base text-gray-950">
                Discover the best gyms around your location with just a click!
                Our interactive map helps you locate nearby fitness centers so
                you can stay on track with your workout goals.
              </p>

              <a
                href="/main"
                title=""
                class="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-500 ease-in-out transform hover:scale-105 bg-slate-950 rounded-md mt-9 hover:bg-grey-950 focus:bg-grey-950"
                role="button"
              >
                {" "}
                check all gyms{" "}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Maps;
