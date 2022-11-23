import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <div className=" min-vh-100 ">{props.children}</div>
      <footer className=" flex-shrink-0 py-3 bg-dark text-white-50 d-none d-md-block">
        <div className="container text-center">
          <small>Copyright &copy; Budget-App 2022</small>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
