import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FcDoughnutChart } from "react-icons/fc";

const MainNavigation = () => {
  const [profileShow, setProfileShow] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <nav className=" container-fluid bg-dark text-white mb-3 ">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5">
              <h1>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  href="/"
                >
                  Budget App
                </Link>
              </h1>
            </div>
            <div className="col-md-6 align-self-center">
              <div className="row text-center  justify-content-center justify-content-md-end ">
                <div className="col-6 col-md-2 - pt-2 ">
                  <Link className="text-decoration-none" href="/">
                    <h5
                      className={
                        router.pathname == "/"
                          ? "text-decoration-none text-secondary"
                          : "text-decoration-none text-white"
                      }
                    >
                      Home
                    </h5>
                  </Link>
                </div>
                {session && (
                  <div className="col-6 col-md-2">
                    <div className="row">
                      <div className="col mb-2 mb-md-0">
                        <img
                          onClick={() => {
                            setProfileShow(!profileShow);
                          }}
                          className="img-fluid"
                          src={session.user.image}
                          alt="profile picture"
                          style={{
                            maxWidth: "2.5rem",
                            borderRadius: "2rem",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>

                    {session && profileShow && (
                      
                      <div className="row">
                        <div className="col">
                          <ul
                            onMouseOver={() => {
                              setProfileShow(true);
                            }}
                            onMouseOut={() => {
                              setProfileShow(false);
                            }}
                            className="bg-dark list-group position-fixed"
                          >
                            <li className="list-group-item ">
                              <Link
                                href="/profile"
                                className="link-dark text-decoration-none"
                              >
                                Profile
                              </Link>
                            </li>
                            <li
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                signOut();
                              }}
                              className="list-group-item text-danger"
                            >
                              Logout
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!session ? (
                  <div className="col-6 col-md-5 pt-1 mb-2 m-md-0 ">
                    <Link
                      style={{ transition: "all 0.3s ease-in" }}
                      className={
                        router.pathname === "/register"
                          ? "text-decoration-none btn btn-primary rounded-4 text-white"
                          : "text-decoration-none btn btn-primary text-white"
                      }
                      href="/register"
                    >
                      Register Now!
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container d-sm-none position-fixed bottom-0 " style={{zIndex:'999'}}>
        <div className=" row vw-100 bg-primary text-center rounded-top align-items-center " style={{minHeight:'3.5rem'}}>
        <div className="col fs-4 text-white "><Link className="text-white text-decoration-none" href="/">Home</Link></div>
        <div className="col-2 fs-4 text-white bg-white rounded-pill" ><Link className="text-white text-decoration-none " href="/login"><FcDoughnutChart size={40} /></Link></div>
        <div className="col fs-4 text-white "><Link className="text-white text-decoration-none" href="/profile">Profile</Link></div>
        
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
