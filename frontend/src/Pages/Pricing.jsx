import React from "react";
import { Navbar } from "../Components";
import Footer from "../Components/Footer";

function Pricing() {
  return (
    <>
    <Navbar/>
      <section class="py-10 bg-white sm:py-16 lg:py-24">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Pricing & Plans
            </h2>
          </div>

          <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3">
            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
              <div class="p-8 xl:px-12">
                <h3 class="text-base font-semibold text-slate-950">
                  Monthly
                </h3>
                <p class="text-5xl font-bold text-black mt-7">$9</p>
                <p class="mt-3 text-base text-gray-950">One-time payment</p>

                <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Workout Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Diet Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Personal Dashboard{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Target Management{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed">
                      {" "}
                      Premium Support{" "}
                    </span>
                  </li>
                </ul>

                <a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-slate-950 rounded-md hover:bg-slate-950 focus:bg-slate-950"
                  role="button"
                >
                  {" "}
                  Get full access{" "}
                </a>
                <p class="mt-4 text-sm text-gray-500">
                  14 Days Moneyback Guarantee
                </p>
              </div>
            </div>

            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
              <div class="p-8 xl:px-12">
                <h3 class="text-base font-semibold text-slate-950">
                  Half-Yearly
                </h3>
                <p class="text-5xl font-bold text-black mt-7">$45</p>
                <p class="mt-3 text-base text-gray-950">One-time payment</p>

                <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Workout Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Diet Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Personal Dashboard{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Target Management{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed">
                      {" "}
                      Premium Support{" "}
                    </span>
                  </li>
                </ul>

                <a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-slate-950 rounded-md hover:bg-slate-950 focus:bg-slate-950"
                  role="button"
                >
                  {" "}
                  Get full access{" "}
                </a>
                <p class="mt-4 text-sm text-gray-500">
                  14 Days Moneyback Guarantee
                </p>
              </div>
            </div>
            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
              <div class="p-8 xl:px-12">
                <h3 class="text-base font-semibold text-slate-950">
                  Yearly
                </h3>
                <p class="text-5xl font-bold text-black mt-7">$90</p>
                <p class="mt-3 text-base text-gray-950">One-time payment</p>

                <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Workout Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Diet Plan{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Personal Dashboard{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="h-5 text-slate-950 flex-shrink-0w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-base font-medium text-gray-900">
                      {" "}
                      Target Management{" "}
                    </span>
                  </li>

                  <li class="inline-flex items-center space-x-2">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-slate-950"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed">
                      {" "}
                      Premium Support{" "}
                    </span>
                  </li>
                </ul>

                <a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-slate-950 rounded-md hover:bg-slate-950 focus:bg-slate-950"
                  role="button"
                >
                  {" "}
                  Get full access{" "}
                </a>
                <p class="mt-4 text-sm text-gray-500">
                  14 Days Moneyback Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Pricing;
