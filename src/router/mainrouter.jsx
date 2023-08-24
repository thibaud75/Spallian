import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";

// Page not found
import NotFound from "../pages/NotFound/NotFound"

import Movies from "../pages/Movies/Movies"

// Page MMovie
import MMovie from "../pages/Movie/Movie";
import Notes from "../pages/Movie/NavMovie/Notes";
import Critiques from "../pages/Movie/NavMovie/Critiques";
import Comments from "../pages/Movie/NavMovie/Comments";
import Plot from "../pages/Movie/NavMovie/Plot";

export default function MainRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route
          path="/movie/:id"
          element={
            <>
              <MMovie />
            </>
          }
        >
          <Route path="notes" element={<Notes />} />
          <Route path="critiques" element={<Critiques />} />
          <Route path="comments" element={<Comments />} />
          <Route path="plot" element={<Plot />} />
        </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}