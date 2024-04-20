import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { ChangeEvent, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { useStorageUpload } from "@thirdweb-dev/react";
import { UploadToStorage } from "@/util";


const GenerateRequestedRwa = () => {
      const [ipfsLink, updateLink] = useState<string>();
      const { mutateAsync: upload } = useStorageUpload();

      const uploadFile = async (
        event: ChangeEvent<HTMLInputElement | null>
      ) => {
        let file = event.currentTarget.files && event.currentTarget.files[0];
        const uris = await upload({ data: [file] });
        updateLink(uris[0]);
      };

      const handleGenerateRwaSubmit = (
        values: {
          address: string;
          price: number | undefined;
          property_RegId: number | undefined;
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
        <h1 className="p-4 text-3xl">Generate Rwa</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">generate</h1>
              <Formik
                initialValues={{
                  address: "",
                  price: undefined,
                  property_RegId: undefined,
                  tokenURI: ipfsLink,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleGenerateRwaSubmit(values, setSubmitting)
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
