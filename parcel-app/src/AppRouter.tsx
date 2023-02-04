import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Streams from "./Streams";
import Events from "./Events";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/streams" element={<Streams />} />
      <Route path="/events" element={<Events />} />
      <Route path="*" element={<Navigate to="/streams" />} />
    </Routes>
  );
};

export default AppRouter;
