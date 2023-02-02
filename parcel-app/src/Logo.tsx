import { FC } from "react"
import logo from "./logo512.png"
const Logo: FC<{ className: string }> = ({ className = "h-8 w-8" }) => {
    return (
        <div className={className}>
            <img src={logo} alt="Nodeless Logo" />
        </div>
    )
}
export default Logo
