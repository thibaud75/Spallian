// import React, { useState, useEffect } from "react";
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
// import NavHeader from "./components/NavHeader/NavHeader";
// import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
// import ButtonSearch from "./components/ButtonSearch/ButtonSearch";
// import "./styles.css";

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [totalResults, setTotalResults] = useState(0);
//   const [noMoviesFound, setNoMoviesFound] = useState(false);
//   const navigate = useNavigate();
//   const queryClient = new QueryClient();

//   const apiKey = "e8d2b17f"; // My own key to do requests on omdbapi

//   // Function to set what user write in a useState
//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Function to handle API request when user press Enter key or click on search button
//   const handleSearch = async () => {
//     setNoMoviesFound(false);
//     setLoading(true);

//     // This request is usefull because omdbapi only shows 10 movies that match with enter value
//     // What we do here is to request the API to know how many movies we could get thanks to totalResult
//     try {
//       const searchResponse = await fetch(
//         `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`
//       );
//       const searchData = await searchResponse.json();
//       setTotalResults(parseInt(searchData.totalResults));

//       // Once we get totalResults we can divide by 10 the result and round up the number with Math.ceil
//       // Example : if totalresults = 108 we divide by 10 and we get 11 = we have to do 11 API request to
//       // get full results
//       const numRequests = Math.ceil(parseInt(searchData.totalResults) / 10);
//       const fetchPromises = [];

//       // Loop as many time as we need to get full results
//       for (let page = 1; page <= numRequests; page++) {
//         fetchPromises.push(
//           fetch(
//             `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&type=movie&apikey=${apiKey}`
//           )
//             .then((response) => response.json())
//             .then((data) => data.Search)
//         );
//       }

//       // Concatenate all arrays into one and get rid of undefined values
//       const results = await Promise.all(fetchPromises);
//       const allResults = results
//         .flat()
//         .filter((item) => item !== null && item !== undefined);

//       setSearchResults(allResults);
//       console.log(allResults);

//       // If we found movies we navigate to movies and pass searchResults to the /movies route
//       if (allResults.length > 0)
//         navigate("/movies", {
//           state: { searchResults: allResults },
//         });
//       else {
//         setNoMoviesFound(true);
//         setSearchTerm("");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // useEffect(() => {
//   //   console.log(searchResults);
//   // }, [searchResults]);

//   return (
//     <div className="AppDiv">
//       <NavHeader />
//       <div className="container">
//         <h1 className="HeaderTitle">Welcome Spallian !</h1>
//         <p>
//           Click search button or press Enter to get informations on the movie
//           you want !
//         </p>
//         <div className="SearchDiv">
//           <input
//             className="SearchBar"
//             type="text"
//             value={searchTerm}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Search..."
//           />
//           <ButtonSearch onClick={handleSearch} disabled={loading}>
//             {loading ? <LoadingSpinner /> : "Search"}
//           </ButtonSearch>
//         </div>
//         {noMoviesFound && (
//           <p className="ErrorMoviesNotFound">No movies found!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const apiKey = "e8d2b17f"; // Votre propre clé pour les requêtes omdbapi

  const fetchData = async (searchTerm) => {
    const searchResponse = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`
    );
    const searchData = await searchResponse.json();
    return searchData.Search;
  };

  const { data, isLoading, isError } = useQuery(
    ["search", searchTerm],
    () => fetchData(searchTerm),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          const allResults = data.filter(
            (item) => item !== null && item !== undefined
          );
          setSearchResults(allResults); // Vous pouvez maintenant utiliser setSearchResults ici

          if (allResults.length > 0) {
            navigate("/movies", {
              state: { searchResults: allResults },
            });
          } else {
            setNoMoviesFound(true);
            setSearchTerm("");
          }
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
    queryClient.prefetchQuery(["search", searchTerm], () =>
      fetchData(searchTerm)
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
        <h1 className="HeaderTitle">Welcome Spallian !</h1>
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
