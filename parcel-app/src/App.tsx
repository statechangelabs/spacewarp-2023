import React, { FC } from "react"

import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Authenticator from "./Authenticator"
import Main from "./Main"

export const App: FC = () => {
    return (
        <BrowserRouter>
            <Authenticator>
                <Main />
            </Authenticator>

            <ToastContainer />
        </BrowserRouter>
    )
}
