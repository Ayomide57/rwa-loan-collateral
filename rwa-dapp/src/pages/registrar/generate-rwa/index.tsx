import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";

const GenerateRequestedRwa = () => {
  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Collateral</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">Add your collateral</h1>
              <Formik
                initialValues={{
                  address: "",
                  price: "",
                  property_RegId: "",
                  tokenURI: "",
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
                    <div className="flex w-full">
                      <label htmlFor="myfile">
                        <span className="mb-[2px] flex items-center gap-1 text-skin-text"></span>
                        <div>
                          <div className="relative">
                            <div>
                              <Image
                                src="/avatarImage.jpg"
                                className="rounded-full bg-skin-border object-cover"
                                alt="avatar"
                                width="80"
                                height="80"
                                style={{
                                  minWidth: "80px",
                                }}
                              />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 top-0"></div>
                            <div className="absolute bottom-[2px] right-0 rounded-full bg-skin-heading p-1">
                              <svg
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                                className="text-[12px] text-skin-bg"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732Z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <input
                          className="h-[80px]"
                          id="myfile"
                          type="file"
                          accept="image/jpg, image/jpeg, image/png"
                          style={{ display: "none" }}
                          //onChange={(event) => uploadFile(event)}
                        />
                      </label>
                    </div>
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

export default GenerateRequestedRwa;
