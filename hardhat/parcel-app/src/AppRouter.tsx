import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Streams from "./Streams";
import Events from "./Events";
import EditStream from "./EditStream";
import NewStream from "./NewStream";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/streams" element={<Streams />} />
      <Route path="/new" element={<NewStream />} />
      <Route path="/streams/:id" element={<EditStream />} />

      <Route path="/events" element={<Events />} />
      <Route path="*" element={<Navigate to="/streams" />} />
    </Routes>
  );
};

export default AppRouter;
