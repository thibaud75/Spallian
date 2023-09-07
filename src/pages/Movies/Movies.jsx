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
    // Vérifiez d'abord si les données sont dans le localStorage
    const storedData = getStoredData();

    if (storedData && storedData[currentPage]) {
      return storedData[currentPage];
    }

    // Si les données ne sont pas dans le localStorage ou pour cette page spécifique, effectuez la requête API
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&type=movie&apikey=${apiKey}`
    );
    const newData = await response.json();

    // Stockez les données dans le localStorage avec la clé correspondant à l'ID du film
    if (newData && newData.Search) {
      if (storedData) {
        // Si les données existent déjà dans le localStorage, mettez à jour uniquement la page courante.
        storedData[currentPage] = newData;
        localStorage.setItem(searchTerm, JSON.stringify(storedData));
      } else {
        // Si les données n'existent pas encore dans le localStorage, créez une nouvelle entrée.
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
