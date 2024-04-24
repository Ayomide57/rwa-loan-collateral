import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { useStorageUpload } from "@thirdweb-dev/react";
import { CID } from "multiformats/cid";
import { base16 } from "multiformats/bases/base16";
import { base64 } from "multiformats/bases/base64";
import { base32 } from "multiformats/bases/base32";
import { base58 } from "ethers/lib/utils";
import { UploadToStorage, addCompanyCollateral } from "@/util";



const Collateral = () => {
  const [ipfsLink, updateLink] = useState<any>();

    const handleAddCollateralSubmit = (
      values: {
        acres: number;
        documenturl: string;
        price: number;
        property_RegId: number;
        survey_zip_code: number;
        survey_number: number;
        property_type: string;
        property_area: string;
        prop_accessment_per_acre: number;
      },
      setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
    ) => {
      setTimeout(async () => {
        console.log(values);
        const response = await addCompanyCollateral(values);
        console.log(response);
        setSubmitting(false);
      }, 400);
    };

  useEffect(() => {
    console.log(ipfsLink);
  }, [ipfsLink]);
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
                  acres: 0,
                  documenturl: ipfsLink,
                  price: 0,
                  property_RegId: 0,
                  survey_zip_code: 0,
                  survey_number: 0,
                  property_type: "",
                  property_area: "",
                  prop_accessment_per_acre: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleAddCollateralSubmit(values, setSubmitting)
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
                      //value={values.price}
                      placeholder="Acres"
                      name="acres"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.acres && touched.acres && errors.acres}
                    <CustomInput
                      //value={values.price}
                      placeholder="Amount"
                      name="price"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.price && touched.price && errors.price}
                    <CustomInput
                      //value={values.property_RegId}
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
                      //value={values.survey_zip_code}
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
                      //value={values.survey_number}
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
                      //value={values.property_type}
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
                      //value={values.property_area}
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
                      //value={values.prop_accessment_per_acre}
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

export default Collateral;
