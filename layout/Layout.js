import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <div style={{height:'70rem'}}>{props.children}</div>
      <div className="container-fluid border-top border-1 d-none d-md-block " >
        <div className="container mb-5 mb-sm-0">
          <section className="row  "style={{minHeight:'5rem'}}>
            <div className="col my-auto  text-center ">
              <h2>Budget App</h2>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
