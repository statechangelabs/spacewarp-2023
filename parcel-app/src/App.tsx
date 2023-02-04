import React, { FC } from "react";

import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticator from "./Authenticator";
import Signup from "./Signup";
import Login from "./Login";
import ChangePassword from "./ChangePassword";
import ResetPassword from "./ResetPassword";
import Base from "./Base";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AlertProvider from "./Alert";

const queryClient = new QueryClient();
export const App: FC = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Authenticator
          fallback={
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:key" element={<ChangePassword />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          }
        >
          <QueryClientProvider client={queryClient}>
            <Base />
          </QueryClientProvider>
        </Authenticator>
      </AlertProvider>
      <ToastContainer />
    </BrowserRouter>
  );
};
