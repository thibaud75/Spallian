import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Movies.css"


const Movies = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <>
    <NavHeader />
    <div className="MoviesDivMain">
      <h2 className="MoviesTitle">
        {searchResults.length} movies found !
      </h2>
      <div className="MoviesContainer">
        {searchResults.map((elem, index) => {
          return (
            <div className="MoviesDivImg" key={index}>
              <Link to={`/movie/${elem.imdbID}`}>
              <img
                    src={elem.Poster !== "N/A" ? elem.Poster : "https://thumbs.dreamstime.com/z/page-de-l-erreur-non-trouv%C3%A9e-%C3%A9chec-web-du-site-oh-l%C3%A0-conception-d-avertissement-internet-probl%C3%A8me-140342479.jpg?w=768"}
                    alt={elem.Poster}
                    className={`MoviesImage-${index} Movies-img`}
                />

              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Movies;