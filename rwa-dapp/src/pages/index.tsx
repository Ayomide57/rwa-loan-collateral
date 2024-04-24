import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { registerCompany, getCompany } from "@/util";
import { getAccount } from "@wagmi/core";
import Link from "next/link";

const Home = () => {
  const handleRegisterSubmit = async (
    values: {
      username: string;
      companyname: string;
      phonenumber: bigint;
      address: string;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      const response = await registerCompany(values);
      console.log(values);
      console.log(response);
      setSubmitting(false);
    }, 400);
  };

  const [account, setAccount] = useState<`0x${string}`>();
  interface IUserData {
    company: `0x${string}`;
    name: string;
    owner_name: string;
    location: string;
    phone_number: bigint;
    existed: boolean;
  }
  const [userData, setUserData] = useState<IUserData>();

  const UpdateUI = async () => {
    const accountSource = await getAccount();
    setAccount(accountSource?.address);
    console.log(account);
    if (account) {
      const response = getCompany({ borrower: account });
      setUserData(await response);
    }
  };

  useEffect(() => {
    UpdateUI();
    console.log(userData);
  }, [account, userData]);

  return (
    <>
      <div className={styles.container}>
        <h1 className="p-4 text-3xl">Company Information</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            {!userData && (
              <div className="p-4">
                <h1 className="">Register your company information</h1>
                <Formik
                  initialValues={{
                    username: "",
                    companyname: "",
                    phonenumber: BigInt(0),
                    address: "",
                  }}
                  onSubmit={(values, { setSubmitting }) =>
                    handleRegisterSubmit(values, setSubmitting)
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
                        //value={values.name}
                        placeholder="Name"
                        name="username"
                        style={{ color: "black" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.username && touched.username && errors.username}
                      <CustomInput
                        //value={values.companyname}
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
                        //value={values.phonenumber}
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
                        //value={values.address}
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
                        onClick={handleSubmit}
                      />
                    </form>
                  )}
                </Formik>
              </div>
            )}
            {userData && (
              <div className="p-4">
                <h1 className=""> User Information</h1>
                <p>Name: {userData.name}</p>
                <p>Owner Name: {userData.owner_name}</p>
                <p>Phone Number: {userData.phone_number}</p>
                <p>Address: {userData.location}</p>

                <button
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "2px solid white",
                    marginTop: "40px",
                  }}
                >
                  {" "}
                  <Link
                    href={"/company/collateral"}
                    style={{ color: "white", padding: "10px" }}
                  >
                    Add Collaterals
                  </Link>
                </button><br></br>
                <button
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "2px solid white",
                    marginTop: "40px",
                  }}
                >
                  {" "}
                  <Link
                    href={"/company/loans/requestloan"}
                    style={{ color: "white", padding: "10px" }}
                  >
                    Request For Loan
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
