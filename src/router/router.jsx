import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home/Home";
import { NotFound } from "../views/NotFound/NotFound";
import { Laws } from "../views/Laws/Laws";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Laws />} />
        <Route path="/cupon" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
