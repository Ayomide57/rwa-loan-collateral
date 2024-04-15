import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import Link from "next/link";

const Lender = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="p-4 text-3xl">Loans</h1>
          </div>
          <div className="p-8">
            {" "}
            <Link
              href="/company/loans/requestloan"
              className="p-3 text-1xl border border-slate-400 rounded-lg"
            >
              Create New Loan
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">View all loans</h1>
              <table className="table-fix border-separate border-spacing-3 border border-slate-400">
                <thead>
                  <tr>
                    <th>Loan ID</th>
                    <th>Borrower</th>
                    <th>Amount</th>
                    <th>Approve amount</th>
                    <th>Loan Amount Term</th>
                    <th>Credit History</th>
                    <th>Applicant Biz Income</th>
                    <th>Prop Accessment Per acre</th>
                    <th>Property Type</th>
                    <th>Property Area</th>
                    <th>Biz ID</th>
                    <th>Loan status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>Pending</td>
                    <td>View</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1000000000</td>
                    <td>1</td>
                    <td>Pending</td>
                    <td>View</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lender;
