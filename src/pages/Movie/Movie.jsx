import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import NavHeader from "../../components/NavHeader/NavHeader";

import "./Movie.css";

const MMovie = () => {
    const { id } = useParams();
    const apiKey = "e8d2b17f";
    const [movieResult, setMovieResult] = useState(null);
    const [imgAndName, setImgAndName] = useState([]);
  
    const getInfosMovie = () => {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieResult(data);
          const copyPoster = [];
          copyPoster.push(data.Poster);
          console.log(data.Poster, "test22");
          setImgAndName(copyPoster);
          console.log(imgAndName[2]);
        })
        .catch((error) => {
          console.error("omdbapi", error);
        });
    };
  
    console.log(movieResult);
  
    useEffect(() => {
      getInfosMovie();
    }, []);

    return (
        <>
        <NavHeader />
      <div>
        {movieResult ? (
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
        ) : (
          <div className="LdsSpinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      </>
    );
  };
  
  export default MMovie;