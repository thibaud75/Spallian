import React from "react";
import { Link, useLocation } from "react-router-dom";

const Movies = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <div>
      <h2 className="totalresults">
        {searchResults.length} film(s) trouvé(s) !
      </h2>
      <div className="movies-container">
        {searchResults.map((elem, index) => {
          return (
            <div className="movies" key={index}>
              <Link to={`/movie/${elem.imdbID}`}>
                <img
                  src={elem.Poster}
                  alt={elem.Poster}
                  className={`image-${index}` + " movie-img"}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;