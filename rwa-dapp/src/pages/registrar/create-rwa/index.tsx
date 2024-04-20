import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { ChangeEvent, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { useStorageUpload } from "@thirdweb-dev/react";
import { UploadToStorage } from "@/util";


const CreateNewRwa = () => {
    const [ipfsLink, updateLink] = useState<string>();
    const { mutateAsync: upload } = useStorageUpload();

    const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
      let file = event.currentTarget.files && event.currentTarget.files[0];
      const uris = await upload({ data: [file] });
      updateLink(uris[0]);
    };

      const handleCreateNewRwaSubmit = (
        values: {
          address: string;
          price: number | undefined;
          property_RegId: number | undefined;
          survey_zip_code: number | undefined;
          survey_number: number | undefined;
          tokenURI: string | undefined;
        },
        setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
      ) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      };


  return (
    <>
      <div className="container">
        <h1 className="p-4 text-3xl">Create a New RWA</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  address: "",
                  price: undefined,
                  property_RegId: undefined,
                  survey_zip_code: undefined,
                  survey_number: undefined,
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

export default CreateNewRwa;
