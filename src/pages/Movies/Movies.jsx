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
        {searchResults.length} film(s) trouvé(s) !
      </h2>
      <div className="MoviesContainer">
        {searchResults.map((elem, index) => {
          return (
            <div className="MoviesDivImg" key={index}>
              <Link to={`/movie/${elem.imdbID}`}>
                <img
                  src={elem.Poster}
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