import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

const GymCard = ({ gym }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{gym.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-950">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{gym.location}</span>
            </div>
            
            <div className="flex items-center text-gray-950">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>₹{gym.charges}/month</span>
            </div>

            <div className="flex items-center text-gray-950">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <div className="flex flex-wrap gap-2">
                {gym.programme.split(',').map((prog, index) => (
                  <span key={index} className="px-2 py-1 text-sm bg-slate-100 text-slate-950 rounded-full">
                    {prog.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {gym.trainerAvailable && (
            <span className="px-3 py-1 text-sm bg-green-100 text-green-950 rounded-full">
              Trainer Available
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]); // Will store search results or all gyms
  const [allGyms, setAllGyms] = useState([]); // Stores all gyms initially

  // Fetch all gyms when the component mounts
  useEffect(() => {
    const fetchAllGyms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gyms");
        setAllGyms(response.data);
        setResults(response.data); // Show all gyms initially
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
    };
    fetchAllGyms();
  }, []);

  // Fetch search results when the keyword changes
  useEffect(() => {
    if (keyword.trim() === "") {
      setResults(allGyms); // Show all gyms if no search input
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/gyms/search?keyword=${keyword}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword, allGyms]); // Depend on allGyms to reset when data is fetched

  return (
    <>
      <Navbar />
      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24 h-screen">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="flex-1 w-full min-w-0 px-4 sm:px-0">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Type to search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-slate-950 focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {results.length > 0 ? (
              results.map((gym) => (
                <GymCard key={gym._id} gym={gym} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No gyms found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Search;
