import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Movies from "../pages/Movies/Movies";

// Page Movie
import Movie from "../pages/Movie/Movie";
import Casting from "../pages/Movie/NavMovie/Casting";
import PressReview from "../pages/Movie/NavMovie/PressReview";
import Plot from "../pages/Movie/NavMovie/Plot";

import Project from "../pages/Project/Project";
import Presentation from "../pages/Presentation/Presentation";

const queryClient = new QueryClient();

export default function MainRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movies/:movieName/:page" element={<Movies />} />
          <Route
            path="/movie/:id"
            element={
              <>
                {" "}
                <Movie />{" "}
              </>
            }
          >
            <Route path="casting" element={<Casting />} />
            <Route path="press" element={<PressReview />} />
            <Route path="plot" element={<Plot />} />
          </Route>
          <Route path="/project" element={<Project />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
