import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import AuthSvg from "../svg/Authentication.svg";
import FingerPrintSvg from "../svg/fingerprint.svg";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const SignUpForm = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const [isPwMatch, setIsPwMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();

  /***********************************************************************/
  /***********************************************************************/
  /***********************************************************************/

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredName = nameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPasswordRepeat = passwordRepeatRef.current.value;

    if (
      enteredName.trim() === "" ||
      enteredEmail.trim() === "" ||
      enteredPassword.trim() === ""
    ) {
      setIsFormValid(false);
      return;
    }

    if (enteredPassword !== enteredPasswordRepeat) {
      setIsPwMatch(false);
      return;
    }

    const obj = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    const response = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsPwMatch(true);
    setIsFormValid(true);
    setErrorMessage(data.message);

    await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
      callbackUrl: "http://localhost:3000/profile",
    });
    setIsLoading(false);
    router.replace("/profile");
  };
  /***********************************************************************/
  /***********************************************************************/
  /***********************************************************************/
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
                <h2 className="card-title mb-4 text-center">
                  Register /{" "}
                  <span>
                    <Link
                      className=" text-decoration-none btn btn-primary fw-semibold"
                      href="/login"
                    >
                      Login!
                    </Link>
                  </span>
                </h2>

                <div className="row">
                  <div className="col-sm-12 ">
                    <div className="input-group">
                      <input
                        aria-describedby="basic-addon1"
                        ref={nameRef}
                        className="form-control mb-2"
                        type="text"
                        placeholder="Name"
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text rounded-0 rounded-end "
                          id="basic-addon1"
                        >
                          abc
                        </span>
                      </div>
                    </div>
                  </div>
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
                <div className="row mt-1">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input
                        ref={passwordRepeatRef}
                        className="form-control "
                        type="password"
                        placeholder="Confirm Password"
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
                  {errorMessage && (
                    <p className="text-center text-danger">
                      {errorMessage}{" "}
                      <p>
                        Do you want <Link href="/login">Login?</Link>
                      </p>
                    </p>
                  )}
                  {!isPwMatch && (
                    <p className="text-center text-danger">
                      Passwords are not matching!
                    </p>
                  )}
                  {!isFormValid && (
                    <p className="text-center text-danger">
                      Please Enter valid credentials
                    </p>
                  )}
                </div>
                <div className=" d-flex flex-column text-center mt-2 px-5  mb-3">
                  <small className="agree-text">
                    By Signing up you agree to the
                  </small>
                  <a href="#" className="terms">
                    Terms & Conditions
                  </a>
                </div>
                <div className="row mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block confirm-button fw-bold pt-2 pb-2"
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span> Register</span>
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
                    <span className=" fw-bold "> Register with Git-Hub</span>
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
                    className=" btn btn-block  confirm-button border"
                  >
                    <span className="fw-bold text-black-50">
                      {" "}
                      Register with
                    </span>
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

export default SignUpForm;
