import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";

const LoanRequest = () => {
  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Request for loan</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  price: "",
                  property_RegId: "",
                  survey_zip_code: "",
                  survey_number: "",
                  property_type: "",
                  property_area: "",
                  prop_accessment_per_acre: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
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
                      value={values.price}
                      placeholder="Amount"
                      name="price"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.price && touched.price && errors.price}
                    <CustomInput
                      value={values.property_RegId}
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
                      onClick={() => handleSubmit}
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
