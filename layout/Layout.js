import { Fragment } from "react"
import MainNavigation from "../components/MainNavigation"

const Layout = (props) => {
    
    return <Fragment>
        <MainNavigation></MainNavigation>
        {props.children}
    </Fragment>


}


export default Layout