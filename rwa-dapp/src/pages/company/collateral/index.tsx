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
import { UploadToStorage } from "@/util";



const Collateral = () => {
  const [fileHash, setFileHash] = useState<any>();
  const apiKey = process.env.NEXT_PUBLIC_FILECOIN || "";
  const [ipfsLink, updateLink] = useState<any>();


  /**const v0 = CID.parse(
    "zQmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n",
    base58
  );**/

    const handleAddCollateralSubmit = (
      values: {
        price: number | undefined;
        property_RegId: number | undefined;
        survey_zip_code: number | undefined;
        survey_number: number | undefined;
        property_type: string;
        property_area: string;
        prop_accessment_per_acre: number | undefined;
        //documentHash: string
      },
      setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
    ) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    };

 // console.log(v0.toV1().toString());
  //CID.parse(v0.toV1().toString(), base16.decoder);
  //console.log("base16", CID.parse(v0.toV1().toString(), base32.decoder));


  //"ipfs://QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP/Homework1.pdf"
  //['ipfs://QmVxQ5djvZJ5TSx1MEpb8C7HcYn7fkuubtKyJTB1W93pWD/Homework2.pdf']
  //0: "ipfs://QmVxQ5djvZJ5TSx1MEpb8C7HcYn7fkuubtKyJTB1W93pWD/Homework2.pdf"length: 1[[Prototype]]: Array(0)

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
                  price: undefined,
                  property_RegId: undefined,
                  survey_zip_code: undefined,
                  survey_number: undefined,
                  property_type: "",
                  property_area: "",
                  prop_accessment_per_acre: undefined,
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
