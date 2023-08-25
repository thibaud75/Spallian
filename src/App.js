import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavHeader from "./components/NavHeader/NavHeader";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ButtonSearch from "./components/ButtonSearch/ButtonSearch";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [noMoviesFound, setNoMoviesFound] = useState(false);
  const navigate = useNavigate();

  const apiKey = "e8d2b17f";

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const searchResponse = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`
      );
      const searchData = await searchResponse.json();
      setTotalResults(parseInt(searchData.totalResults));

      const numRequests = Math.ceil(parseInt(searchData.totalResults) / 10);
      const fetchPromises = [];

      for (let page = 1; page <= numRequests; page++) {
        fetchPromises.push(
          fetch(
            `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&type=movie&apikey=${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => data.Search)
        );
      }

      const results = await Promise.all(fetchPromises);
      const allResults = results
        .flat()
        .filter((item) => item !== null && item !== undefined);

      setSearchResults(allResults);
      console.log(allResults);

      if (allResults.length > 0)
        navigate("/movies", {
          state: { searchResults: allResults },
        });
      else {
        setNoMoviesFound(true);
      }

      // Pass searchResults to the /movies route
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <>
      <NavHeader />
      <div className="container">
        <p>
          Click button or press Enter to get informations on the movie you want
          !
        </p>
        <div className="SearchDiv">
          <input
            className="SearchBar"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <ButtonSearch onClick={handleSearch} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Search"}
          </ButtonSearch>
        </div>
        {noMoviesFound && (
          <p className="ErrorMoviesNotFound">No movies found!</p>
        )}
      </div>
    </>
  );
};

export default App;
