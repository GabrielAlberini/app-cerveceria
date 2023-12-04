import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home/Home";
import { NotFound } from "../views/NotFound/NotFound";
import { Laws } from "../views/Laws/Laws";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bases-y-condiciones" element={<Laws />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
