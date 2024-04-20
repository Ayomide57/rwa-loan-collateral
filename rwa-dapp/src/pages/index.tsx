import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";


const Home = () => {

  const handleRegisterSubmit = (values: { name: string; companyname: string; phonenumber: number | undefined; address: string; }, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className="p-4 text-3xl">Company Information</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">Register your company information</h1>
              <Formik
                initialValues={{
                  name: "",
                  companyname: "",
                  phonenumber: undefined,
                  address: "",
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleRegisterSubmit(values, setSubmitting )
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
                      value={values.name}
                      placeholder="Name"
                      name="position"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && errors.name}
                    <CustomInput
                      value={values.companyname}
                      placeholder="Company Name"
                      name="companyname"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyname &&
                      touched.companyname &&
                      errors.companyname}
                    <CustomInput
                      value={values.phonenumber}
                      placeholder="Phone number"
                      name="phonenumber"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phonenumber &&
                      touched.phonenumber &&
                      errors.phonenumber}{" "}
                    <CustomInput
                      value={values.address}
                      placeholder="Company Physical Address"
                      name="address"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && errors.address}
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
}

export default Home;
