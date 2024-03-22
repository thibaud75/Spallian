import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import NavHeader from "./components/NavHeader/NavHeader";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ButtonSearch from "./components/ButtonSearch/ButtonSearch";
import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMoviesFound, setNoMoviesFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const apiKey = "e8d2b17f";

  const fetchData = async (searchTerm, page) => {
    const searchResponse = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&type=movie&page=${page}&apikey=${apiKey}`
    );
    const searchData = await searchResponse.json();

    return searchData;
  };

  const { isLoading } = useQuery(
    ["search", searchTerm, currentPage],
    () => fetchData(searchTerm, currentPage),
    {
      enabled: false,
      onSuccess: (data) => {
        debugger;
        if (data.Response !== "False") {
          const { totalResults, Search } = data;
          const allMovies = totalResults;
          const allResults = Search.filter(
            (item) => item !== null && item !== undefined
          );
          setSearchResults(allResults);

          allResults.length > 0
            ? navigate(`/movies/${searchTerm}/${currentPage}`, {
                state: {
                  searchResults: allResults,
                  allMovies: allMovies,
                  searchTerm: searchTerm,
                },
              })
            : (() => {
                setNoMoviesFound(true);
                setSearchTerm("");
              })();
        } else {
          setNoMoviesFound(true);
          setSearchTerm("");
        }
      },
    }
  );

  const handleSearch = () => {
    setNoMoviesFound(false);
    setLoading(true);
    setCurrentPage(1);
    queryClient.prefetchQuery(["search", searchTerm, 1], () =>
      fetchData(searchTerm, 1)
    );
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="AppDiv">
      <NavHeader />
      <div className="container">
        <h1 className="HeaderTitle">Welcome Spallian!</h1>
        <p>
          Click search button or press Enter to get information on the movie you
          want!
        </p>
        <div className="SearchDiv">
          <input
            className="SearchBar"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />
          <ButtonSearch onClick={handleSearch} disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Search"}
          </ButtonSearch>
        </div>
        {noMoviesFound && (
          <p className="ErrorMoviesNotFound">No movies found!</p>
        )}
      </div>
    </div>
  );
};

export default App;
