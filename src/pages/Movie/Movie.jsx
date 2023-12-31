import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import NavHeader from "../../components/NavHeader/NavHeader";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import "./Movie.css";

const fetchMovieDetails = async (id, apiKey) => {
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
};

const Movie = () => {
  const { id } = useParams();
  const apiKey = "e8d2b17f";

  const {
    data: movieResult,
    isLoading,
    isError,
  } = useQuery(["movie", id], () => fetchMovieDetails(id, apiKey), {
    enabled: !!id,
  });

  return (
    <>
      <NavHeader />
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="MovieDivMain">
            <div className="MovieDivImg">
              <img
                src={movieResult.Poster}
                alt={movieResult.Poster}
                className="MovieImg"
              />
            </div>
            <div className="MovieDivInfo">
              <h2 className="MovieTitle">{movieResult.Title}</h2>
              <p className="MovieDirector">
                directed by <strong>{movieResult.Director}</strong>
              </p>
              <div className="MovieNav">
                <nav>
                  <ul>
                    <li>
                      {/* Navlink and Outlet from react router dom to display movie details on the same page */}
                      <NavLink
                        to={`/movie/${id}/casting`}
                        state={{ from: movieResult.Actors }}
                      >
                        Casting
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movie/${id}/press`}
                        state={{ from: movieResult.Ratings }}
                      >
                        Press Review
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movie/${id}/plot`}
                        state={{ from: movieResult.Plot }}
                      >
                        Synopsis
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <div className="MovieNavContent">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
