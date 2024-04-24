import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { loanRequest } from "@/util";


const LoanRequest = () => {
      const handleLoanRequest = (
        values: {
          amount: number;
          property_RegId: number;
        },
        setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
      ) => {
        setTimeout(async() => {
          const response = await loanRequest(values);
          console.log(response);
          setSubmitting(false);
        }, 400);
      };

  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Request for loan</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  amount: 0,
                  property_RegId: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleLoanRequest(values, setSubmitting)
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
                      placeholder="Amount"
                      name="amount"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount && errors.amount}
                    <CustomInput
                      placeholder="property registration number"
                      name="property_RegId"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.property_RegId &&
                      touched.property_RegId &&
                      errors.property_RegId}
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
      </div>
    </>
  );
};

export default LoanRequest;
