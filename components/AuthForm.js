import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import AuthSvg from "../svg/Authentication.svg";
import FingerPrintSvg from "../svg/fingerprint.svg";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
const AuthForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  let router = useRouter();

  const submitFormHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: "http://localhost:3000/profile",
    });
    setIsLoading(false);
    setErrorMessage(status.error);

    if (status.ok) {
      router.replace("/profile");
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="row w-100   justify-content-center">
        <div className="col-md-5 ">
          <AuthSvg />
        </div>
        <div className="col-md-4 ">
          <form onSubmit={submitFormHandler}>
            <div className="card px-1 py-4">
              <div className="card-body">
                <h2 className="card-title mb-4 text-center ">
                  <span>
                    <Link
                      className=" text-decoration-none btn btn-primary fw-semibold"
                      href="/register"
                    >
                      {" "}
                      Register!
                    </Link>
                  </span>{" "}
                  / Login{" "}
                </h2>
                <div className="row">
                  <div className="col-sm-12 ">
                    <div className="input-group">
                      <input
                        aria-describedby="basic-addon1"
                        ref={emailRef}
                        className="form-control mb-2"
                        type="email"
                        placeholder="E-mail"
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text rounded-0 rounded-end "
                          id="basic-addon1"
                        >
                          @
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input
                        ref={passwordRef}
                        className="form-control"
                        type="password"
                        placeholder="Password"
                      />
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text h-100 rounded-0 rounded-end "
                          id="basic-addon1"
                        >
                          <FingerPrintSvg />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-center text-danger">{errorMessage}</p>
                )}
                {!isFormValid && (
                  <p className="text-center text-danger">
                    Please Enter valid credentials
                  </p>
                )}

                <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                  <small className="agree-text">
                    Dont you have an account yet?
                  </small>
                  <Link href="/register" className="terms">
                    Create a new one!
                  </Link>
                </div>
                <div className="row mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block confirm-button"
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span> Login</span>
                    )}
                  </button>
                </div>
                <div className="row">
                  <button
                    type="button"
                    onClick={() => {
                      signIn("github", {
                        callbackUrl: "http://localhost:3000/profile",
                      });
                    }}
                    className="btn btn-dark btn-block confirm-button mb-2 align-items-center"
                  >
                    <span className=" fw-bold "> Login with Git-Hub</span>
                    <BsGithub className="ms-2" size={30}></BsGithub>
                  </button>
                </div>
                <div className="row">
                  <button
                    type="button"
                    onClick={() => {
                      signIn("google", {
                        callbackUrl: "http://localhost:3000/profile",
                      });
                    }}
                    className=" btn btn-block confirm-button border"
                  >
                    <span className="fw-bold text-black-50"> Login with</span>
                    <FcGoogle className="ms-2" size={30}></FcGoogle>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
