import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import Link from "next/link";

const Registrar = () => {
  const handleFindRwa = (
    values: {
      address: string;
      property_RegId: number | undefined;
    },
    setSubmitting: {
      (isSubmitting: boolean): void;
      (arg0: boolean): void;
    }
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Find Property Information</h1>
        <button
          style={{
            color: "white",
            padding: "10px",
            border: "2px solid white",
            marginTop: "10px",
            marginLeft: "20px",
          }}
        >
          {" "}
          <Link
            href={"/registrar/create-rwa"}
            style={{ color: "white", padding: "10px" }}
          >
            Create New Real World Asset
          </Link>
        </button>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  address: "",
                  property_RegId: undefined,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleFindRwa(values, setSubmitting)
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
                      value={values.address}
                      placeholder="owner address"
                      name="address"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && errors.address}
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

export default Registrar;
