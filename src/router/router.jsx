import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home/Home";
import { NotFound } from "../views/NotFound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
