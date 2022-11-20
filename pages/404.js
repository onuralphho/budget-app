import Error from "../svg/Error.svg";
import Link from "next/link";
import { useRouter } from "next/router";
const Page_404 = () => {
  const router = useRouter()
  return (
    <div className="container  ">
      <div className="row" style={{height:'70vh'}}>
        <div className="col my-auto">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <Error />
            </div>
          </div>
          <div className="row text-center p-3">
            <h1>You have found a page that does not exist!</h1>
              <span>
              <button onClick={() => {
                router.back()
              }} className="btn w btn-primary mt-2">
                Come Back To Reality!
              </button></span>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page_404;
