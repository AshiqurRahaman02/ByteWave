import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";

function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* Add more routes here if needed */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRouter;
