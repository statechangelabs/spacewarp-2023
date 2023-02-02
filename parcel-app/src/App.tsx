import React, { FC } from "react"

import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Authenticator from "./Authenticator"
import Main from "./Main"
import Signup from "./Signup"
import Login from "./Login"
export const App: FC = () => {
    return (
        <BrowserRouter>
            <Authenticator
                fallback={
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                }
            >
                <Main />
            </Authenticator>
            <ToastContainer />
        </BrowserRouter>
    )
}
