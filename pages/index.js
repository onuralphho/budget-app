import Head from "next/head";
import { Fragment } from "react";
import BudgetSvg from "../svg/Statistics.svg";
import { useSession, getSession } from "next-auth/react";
import DeptSvg from "../svg/Dept.svg";
import WaveSvg from "../svg/wave.svg";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Fragment>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Budget App for your family" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container base-color mt-5 text-dark  ">
        <div className="row">
          <div className="row text-center d-block d-sm-none">
            <h1>Budget App</h1>
          </div>
          <div className="col-md-6">
            <BudgetSvg />
          </div>

          <div className="col-md-6 mt-5  ">
            <h2>Track your expenses with Name.io</h2>
            <p>
              The new way of tracking your expenses. Create a family, add your
              family members and watch your incomes and expenses!
            </p>
          </div>
        </div>
      </main>
      <section className="">
        <WaveSvg />
        <section className="bg-primary p-3 min-vh-100">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-6 pt-md-5">
                <h1>Are you enough with depts?</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus quibusdam eum inventore quisquam odit dolore
                  iusto distinctio, repudiandae fugit totam quos perferendis
                  ratione est nam tenetur placeat provident, velit voluptates?
                </p>
              </div>
              <div className="col-md-6">
                <DeptSvg />
              </div>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
}
