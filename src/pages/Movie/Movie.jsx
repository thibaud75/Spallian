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
                  <div className="div-image-movie">
                    <img
                      src={movieResult.Poster}
                      alt={movieResult.Poster}
                      className="SingleMovie-image"
                    />
                  </div>
                  <div className="div-right">
                    <div className="infos-movie">
                      <h2 className="SingleMovie-title">{movieResult.Title}</h2>
  
                      <p className="singleMovie-director">
                        made by {movieResult.Director}
                      </p>
                      <div className="div-nav">
                        <nav>
                          <ul>
                            <li>
                              <NavLink
                                to={`/movie/${id}/notes`}
                                state={{ from: movieResult.Actors }}
                              >
                                Casting
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={`/movie/${id}/critiques`}
                                state={{ from: movieResult.Ratings }}
                              >
                                Critiques presse
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={`/movie/${id}/comments`}
                                state={{ from: movieResult.Plot }}
                              >
                                Other infos
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
                        <div className="div-nav-content" style={{ width: "80%" }}>
                          <Outlet />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
        ) : (
          <div className="lds-spinner">
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