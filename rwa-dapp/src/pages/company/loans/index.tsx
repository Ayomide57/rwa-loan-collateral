import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import Link from "next/link";

const Loan = () => {

  return (
    <>
      <div className="container">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="p-4 text-3xl">Loan Requests</h1>
          </div>
          <div className="p-8">
            {" "}
            <Link
              href="/company/loans/requestloan"
              className="p-3 text-1xl border border-slate-400 rounded-lg"
            >
              Request Loan
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">View all your loan requests</h1>
              <table className="table-auto border-separate border-spacing-3 border border-slate-400">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Amount</th>
                    <th>Approve amount</th>
                    <th>Collateral ID</th>
                    <th>Loan status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
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

export default Loan;
