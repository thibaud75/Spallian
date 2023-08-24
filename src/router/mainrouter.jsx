import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";

// Page not found
import NotFound from "../pages/NotFound/NotFound"

import Movies from "../pages/Movies/Movies"

// Page Movie
import MMovie from "../pages/Movie/Movie";
import Casting from "../pages/Movie/NavMovie/Casting";
import PressReview from "../pages/Movie/NavMovie/PressReview";
import Plot from "../pages/Movie/NavMovie/Plot";

// Page Thelma
import Thelma from "../pages/Thelma/Thelma";

// Page Spallian
import Spallian from "../pages/Spallian/Spallian";

export default function MainRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route path="/movie/:id" element={ <> <MMovie /> </>}>
                <Route path="casting" element={<Casting />} />
                <Route path="press" element={<PressReview />} />
                <Route path="plot" element={<Plot />} />
            </Route>
            <Route path="/thelma" element={<Thelma />}/>
            <Route path="/spallian" element={<Spallian />}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}