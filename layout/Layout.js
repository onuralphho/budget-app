import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <div className=" min-vh-100 ">{props.children}</div>
      <footer class=" flex-shrink-0 py-3 bg-dark text-white-50 d-none d-md-block">
        <div class="container text-center">
          <small>Copyright &copy; Budget-App</small>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
