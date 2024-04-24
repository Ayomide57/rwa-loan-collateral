import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { UploadToStorage, createNewRwa } from "@/util";
import Link from "next/link";


const CreateNewRwa = () => {
    const [ipfsLink, updateLink] = useState<any>();

      const handleCreateNewRwaSubmit = (
        values: {
          rwaOwner: any;
          price: number;
          property_RegId: number;
          survey_zip_code: number;
          survey_number: number;
          tokenURI: string;
        },
        setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
      ) => {
        setTimeout(async () => {
          console.log(values);
          const response = await createNewRwa(values);
          console.log(response);
          setSubmitting(false);
        }, 400);
      };
  
  useEffect(() => {
console.log(ipfsLink)
  },[ipfsLink])


  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Create a New RWA</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  rwaOwner: ``,
                  price: 0,
                  property_RegId: 0,
                  survey_zip_code: 0,
                  survey_number: 0,
                  tokenURI: ipfsLink,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleCreateNewRwaSubmit(values, setSubmitting)
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
                    <UploadToStorage updateLink={updateLink} />
                    <CustomInput
                      placeholder="Owner address"
                      name="rwaOwner"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.rwaOwner && touched.rwaOwner && errors.rwaOwner}
                    <CustomInput
                      placeholder="Amount"
                      name="price"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.price && touched.price && errors.price}
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
                    <CustomInput
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
                      placeholder="survey number"
                      name="survey_number"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.survey_number &&
                      touched.survey_number &&
                      errors.survey_number}
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

export default CreateNewRwa;
