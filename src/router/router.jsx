import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home/Home";
import { NotFound } from "../views/NotFound/NotFound";
import { Laws } from "../views/Laws/Laws";
import ScrollToHash from "../components/ScrollToHash/ScrollToHash";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bases-y-condiciones" element={<Laws />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
