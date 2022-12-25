import Link from "next/link";
import Image from "next/image";
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
      <nav
        className=" container-fluid bg-white text-white  d-none d-sm-block"
        style={{ zIndex: "99" }}
      >
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5">
              <h1>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-dark"
                  href="/"
                >
                  <span className="fs-3 fw">
                    <span className="fs-1 text-primary me-1">Budget</span>App
                  </span>
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
                          ? "text-decoration-none text-primary pb-1 border-bottom border-primary border-2"
                          : "text-decoration-none text-primary pb-1"
                      }
                    >
                      Home
                    </h5>
                  </Link>
                </div>
                {!session&&<div className="col-6 col-md-2 - pt-2 ">
                  <Link className="text-decoration-none" href="/login">
                    <h5
                      className={
                        router.pathname == "/login"
                          ? "text-decoration-none text-primary pb-1 border-bottom border-primary border-2"
                          : "text-decoration-none text-primary pb-1"
                      }
                    >
                      Login
                    </h5>
                  </Link>
                </div>}

                {session && (
                  <div className="col-6 col-md-2 align-self-center">
                    <div className="row">
                      <div className="col mb-2 mb-md-0 ">
                        <Image
                          onClick={() => {
                            setProfileShow(!profileShow);
                          }}
                          className="img-fluid"
                          src={session.user.image}
                          alt="profile picture"
                          width={300}
                          height={300}
                          style={{
                            maxWidth: "2.5rem",
                            borderRadius: "2rem",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>

                    {session && profileShow && (
                      <div className="row ">
                        <div className="col " style={{ zIndex: "9999" }}>
                          <ul
                            onMouseOver={() => {
                              setProfileShow(true);
                            }}
                            onMouseOut={() => {
                              setProfileShow(false);
                            }}
                            className="slide-in list-group position-absolute rounded-4 bg-dark border border-2 border-primary "
                          >
                            <li className="list-group-item bg-dark ">
                              <Link
                                href="/profile"
                                style={{ cursor: "pointer" }}
                                className=" text-white text-decoration-none"
                                onClick={() => {
                                  setProfileShow(false);
                                }}
                              >
                                Profile
                              </Link>
                            </li>
                            <li
                              className="list-group-item bg-dark text-danger  "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                signOut({ callbackUrl: "/" });
                              }}
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
                  <div className="w-auto pt-1 mb-2 m-md-0 ">
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
      <div
        className="container d-sm-none position-fixed bottom-0 "
        style={{ zIndex: "999" }}
      >
        <div
          className=" row vw-100 bg-dark text-center  align-items-center "
          style={{
            minHeight: "3.5rem",
            borderTopLeftRadius: "1.8rem",
            borderTopRightRadius: "1.8rem",
          }}
        >
          <div className="col fs-4 text-white ">
            <Link
              className={
                router.pathname == "/"
                  ? "text-decoration-none text-primary pb-1 border-bottom border-primary border-2"
                  : "text-decoration-none text-white"
              }
              href="/"
            >
              Home
            </Link>
          </div>
          <div className="col-2 fs-4 text-white ">
            <Link
              className="text-white text-decoration-none position-relative"
              href="/login"
            >
              {!session ? (
                <FcDoughnutChart size={40} className="CardEffect" />
              ) : (
                <Image
                  onClick={() => {
                    setProfileShow(!profileShow);
                  }}
                  className="img-fluid"
                  src={session.user.image}
                  alt="profile picture"
                  width={300}
                  height={300}
                  style={{
                    maxWidth: "2.5rem",
                    borderRadius: "2rem",
                    cursor: "pointer",
                  }}
                />
              )}
            </Link>
          </div>
          <div className="col fs-4 text-white ">
            {session ? (
              <Link className="text-white text-decoration-none" href="/profile">
                <span
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-danger"
                >
                  Log Out
                </span>
              </Link>
            ) : (
              <Link
                className={
                  router.pathname === "/login" ||
                  router.pathname === "/register"
                    ? "text-decoration-none text-primary pb-1 border-bottom border-primary border-2"
                    : "text-decoration-none text-white"
                }
                href="/login"
              >
                <span className="">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
