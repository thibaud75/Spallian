import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NavHeader from "../../components/NavHeader/NavHeader";
import Pagination from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Movies.css";

const Movies = () => {
  const { page, movieName } = useParams();
  const location = useLocation();
  const [allMovies, setAllMovies] = useState(location.state?.allMovies);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm);
  console.log(allMovies + " " + searchTerm);

  const navigate = useNavigate();

  const apiKey = "e8d2b17f";
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  const totalPages = Math.ceil(allMovies / 10);

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
    console.log(page);
  }, [page]);

  const getTotalResults =
    location.state?.allMovies ||
    JSON.parse(localStorage.getItem(movieName))[1].totalResults;

  useEffect(() => {
    setSearchTerm(movieName);
    setAllMovies(getTotalResults);
  }, []);

  const getStoredData = () => {
    const storedData = localStorage.getItem(searchTerm);
    return storedData ? JSON.parse(storedData) : null;
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);

    const storedData = getStoredData();

    if (storedData) {
      const updatedData = {
        ...storedData,
        [currentPage]: data,
      };
      localStorage.setItem(searchTerm, JSON.stringify(updatedData));
    } else {
      console.log(searchTerm);
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&type=movie&apikey=${apiKey}`
      );
      const newData = await response.json();

      localStorage.setItem(
        searchTerm,
        JSON.stringify({ [currentPage]: newData })
      );
    }

    navigate(`/movies/${searchTerm}/${newPage}`);
  };

  const fetchData = async () => {
    const storedData = getStoredData();

    if (storedData && storedData[currentPage]) {
      return storedData[currentPage];
    }

    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&type=movie&apikey=${apiKey}`
    );
    const newData = await response.json();

    if (newData && newData.Search) {
      if (storedData) {
        storedData[currentPage] = newData;
        localStorage.setItem(searchTerm, JSON.stringify(storedData));
      } else {
        localStorage.setItem(
          searchTerm,
          JSON.stringify({ [currentPage]: newData })
        );
      }
    }

    return newData;
  };

  const { data, isLoading, isError } = useQuery(
    ["movies", searchTerm, currentPage],
    fetchData,
    {
      enabled: true,
    }
  );

  const renderMovies = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <div>Error loading data.</div>;
    }

    return data?.Search.map((elem, index) => (
      <div className="MoviesDivImg" key={index}>
        <Link to={`/movie/${elem.imdbID}`}>
          <img
            src={
              elem.Poster !== "N/A"
                ? elem.Poster
                : "https://thumbs.dreamstime.com/z/page-de-l-erreur-non-trouv%C3%A9e-%C3%A9chec-web-du-site-oh-l%C3%A0-conception-d-avertissement-internet-probl%C3%A8me-140342479.jpg?w=768"
            }
            alt={elem.Title}
            className={`MoviesImage-${index} Movies-img`}
          />
        </Link>
      </div>
    ));
  };

  return (
    <>
      <NavHeader />
      <div className="MoviesDivMain">
        <h2 className="MoviesTitle">{allMovies} movies found!</h2>
        {!isLoading && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <div className="MoviesContainer">{renderMovies()}</div>
      </div>
    </>
  );
};

export default Movies;
