import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import NavHeader from "../../components/NavHeader/NavHeader";
import Pagination from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Movies.css";

const Movies = () => {
  const { page } = useParams();
  const location = useLocation();
  const [allMovies] = useState(location.state?.allMovies);
  const [searchTerm] = useState(location.state?.searchTerm);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const apiKey = "e8d2b17f";
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  const totalPages = Math.ceil(allMovies / 10);

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
  }, [page]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    navigate(`/movies/${searchTerm}/${newPage}`);
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&type=movie&apikey=${apiKey}`
    );
    return response.json();
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
