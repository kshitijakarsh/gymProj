import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (keyword.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/filter?keyword=${keyword}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

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
            {results.map((Customers) => (
              <li key={Customers._id} className="bg-white p-4 shadow-md rounded-md mb-2">
                Gym Name : <strong> {Customers.name} </strong> - Location : <strong>{Customers.location}</strong><br />
                Budget : <strong>{Customers.budget}</strong> - Programme : <strong>{Customers.programme}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Search;
