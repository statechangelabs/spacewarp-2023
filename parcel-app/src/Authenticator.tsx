import React, { FC, ReactElement, ReactNode, PropsWithChildren, Fragment } from "react"

const Authenticator:FC<PropsWithChildren<{}>> = ({children})=>{
    return <Fragment>{children}</Fragment>
}
export default Authenticator