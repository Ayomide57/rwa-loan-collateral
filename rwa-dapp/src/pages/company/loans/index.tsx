import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import Link from "next/link";
import { getLoanRequestList } from "@/util";
import { getAccount } from "@wagmi/core";

const Loan = () => {
  interface IRequestData {
    verification_status: boolean;
    address: `0x${string}`;
    amount: bigint;
    property_RegId: bigint;
    request_id: bigint;
  }

      const [requestData, setRequestData] =
        useState<IRequestData[]>();
    const [account, setAccount] = useState<`0x${string}`>();


        const getLoanRequest = (
          values: {
            requestId: number;
          },
          setSubmitting: {
            (isSubmitting: boolean): void;
            (arg0: boolean): void;
          }
        ) => {
          setTimeout(async () => {

            if (account) {
              const response: IRequestData = getLoanRequestList({
                address: account,
                requestId: values.requestId,
              });
              response && setRequestData(await response);
              console.log(response.amount);
            }
            setSubmitting(false);
          }, 400);
        };



    useEffect(() => {
      // UpdateUI();
                  const accountSource = getAccount();
                  setAccount(accountSource?.address);

            console.log(account);
      console.log(requestData);
    }, [account, requestData]);


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
              <Formik
                initialValues={{
                  requestId: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  getLoanRequest(values, setSubmitting)
                }
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <CustomInput
                      placeholder="Loan Request Id"
                      name="requestId"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.requestId && touched.requestId && errors.requestId}
                    <CustomButton
                      value="Submit"
                      type={"button"}
                      style={{ float: "inline-end" }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    />
                  </form>
                )}
              </Formik>
            </div>
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
                    <th>Owner</th>
                    <th>Property Reg ID</th>
                    <th>verification status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData && (
                    <tr>
                      <td>{requestData.request_id as bigint}</td>
                      <td>{requestData.amount}</td>
                      <td>{requestData.address}</td>
                      <td>{requestData.property_RegId}</td>
                      <td>{requestData.verification_status}</td>
                      <td>View</td>
                    </tr>
                  )}
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
