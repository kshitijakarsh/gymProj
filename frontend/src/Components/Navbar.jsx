import React from "react";
import Logo from '../assets/images/Logo.png'

function Navbar() {
  return (
    <>
    <header class="pb-6 bg-white lg:pb-0 drop-shadow-md">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-16 lg:h-20">
            <div class="flex-shrink-0">
                <a href="/" title="" class="flex">
                    <img class="w-10 h-10 lg:h-10" src={Logo} alt="" />
                </a>
            </div>

            {/* <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>

                <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button> */}

            <div class="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                <a href="/main" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-red-950 focus:text-slate-950"> locate </a>

                <a href="/programs" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-red-950 focus:text-slate-950"> programs </a>

                <a href="/pricing" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-red-950 focus:text-slate-950"> pricing </a>
            </div>

            <a href="/select-role" title="" class="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-500 ease-in-out transform hover:scale-105 bg-slate-950 border border-transparent rounded-md lg:inline-flex hover:bg-slate-950 focus:bg-slate-950" role="button"> get started now </a>
        </nav>

        <nav class="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div class="flow-root">
                <div class="flex flex-col px-6 -my-2 space-y-1">
                    <a href="/main" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-slate-950 focus:text-slate-950"> locate </a>

                    <a href="/programs" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-slate-950 focus:text-slate-950"> programs </a>

                    <a href="/pricing" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-slate-950 focus:text-slate-950"> pricing </a>
                </div>
            </div>

            <div class="px-6 mt-6">
                <a href="/select-role" title="" class="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-500 ease-in-out transform hover:scale-105 bg-slate-950 border border-transparent rounded-md tems-center hover:bg-slate-950 focus:bg-slate-950" role="button"> Get started now </a>
                

            </div>
        </nav>
    </div>
</header>

    </>
  );
}

export default Navbar;
