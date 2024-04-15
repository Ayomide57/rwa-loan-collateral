import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";

const Collateral = () => {
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
                    <CustomInput
                      value={values.survey_zip_code}
                      placeholder="survey zip code"
                      name="survey_zip_code"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.survey_zip_code &&
                      touched.survey_zip_code &&
                      errors.survey_zip_code}{" "}
                    <CustomInput
                      value={values.survey_number}
                      placeholder="survey number"
                      name="survey_number"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.survey_number &&
                      touched.survey_number &&
                      errors.survey_number}
                    <CustomInput
                      value={values.property_type}
                      placeholder="property type"
                      name="property_type"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.property_type &&
                      touched.property_type &&
                      errors.property_type}
                    <CustomInput
                      value={values.property_area}
                      placeholder="property area"
                      name="property_area"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.property_area &&
                      touched.property_area &&
                      errors.property_area}{" "}
                    <CustomInput
                      value={values.prop_accessment_per_acre}
                      placeholder="property accessment per acre"
                      name="prop_accessment_per_acre"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.prop_accessment_per_acre &&
                      touched.prop_accessment_per_acre &&
                      errors.prop_accessment_per_acre}
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

export default Collateral;
