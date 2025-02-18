import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Icons for better visual hierarchy
const Icons = {
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    </svg>
  ),
  Price: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Trainer: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  )
};

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [allGyms, setAllGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllGyms = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://gymproj-jso7.onrender.com/api/gyms");
        setAllGyms(response.data);
        setResults(response.data);
      } catch (error) {
        setError("Failed to load gyms. Please try again later.");
        console.error("Error fetching gyms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllGyms();
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setResults(allGyms);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(`https://gymproj-jso7.onrender.com/api/gyms/search?keyword=${keyword}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword, allGyms]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500 mx-auto"></div>
          <p className="mt-4 text-gray-950">Finding the perfect gym for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center text-red-950">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-950 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="bg-gradient-to-r from-slate-500 to-slate-950 rounded-xl shadow-lg p-6 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-white mb-4">
                Find Your Perfect Gym 💪
              </h1>
              <p className="text-slate-100 mb-6">
                Search through our curated list of premium fitness centers
              </p>
              
              {/* Enhanced Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search by name, location, or programs..."
                  className="block w-full pl-12 pr-4 py-4 text-base text-gray-900 
                           placeholder-gray-500 bg-white rounded-xl shadow-sm 
                           border-2 border-transparent focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.length > 0 ? (
              results.map((gym) => (
                <div key={gym._id} 
                     className="bg-white rounded-xl shadow-sm hover:shadow-lg 
                              transition-all duration-300 overflow-hidden
                              transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{gym.name}</h3>
                      {gym.trainerAvailable && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 
                                     rounded-full text-sm font-medium flex items-center gap-1">
                          <Icons.Trainer />
                          Trainer Available
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <Icons.Location className="text-blue-500 mr-2" />
                        <span>{gym.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <Icons.Price className="text-green-500 mr-2" />
                        <span>₹{gym.charges}/month</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full bg-slate-500 text-white py-2 px-4 
                                   rounded-lg hover:bg-slate-950 transition-colors
                                   focus:outline-none focus:ring-2 focus:ring-slate-500 
                                   focus:ring-offset-2">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <p className="text-gray-500 text-lg mb-4">
                    No gyms found matching your search.
                  </p>
                  <p className="text-gray-400">
                    Try adjusting your search terms or explore our full listing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;