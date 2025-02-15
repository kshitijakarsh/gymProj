import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

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

          <ul className="mt-6 list-none">
            {results.length > 0 ? (
              results.map((gym) => (
                <li key={gym._id} className="bg-white p-4 shadow-md rounded-md mb-2">
                  Gym Name: <strong>{gym.name}</strong> - Location: <strong>{gym.location}</strong><br />
                  Charges: <strong>{gym.charges}</strong> - Programme: <strong>{gym.programme}</strong>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No gyms found.</p>
            )}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Search;
