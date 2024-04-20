
import { IpfsUploadBatchOptions, ThirdwebStorage } from "@thirdweb-dev/storage";
import { ChangeEvent } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";


import { readContract } from "@wagmi/core";

import { config } from "./config";
import {
  borrowerAbi,
  registrarAbi,
  lenderAbi,
  lenderAddresses,
  registrarAddresses,
  borrowerAddresses,
} from "./constants";

interface IUploadFile {
  updateLink: (value: string) => void;
}

export const UploadToStorage = ({ updateLink }: IUploadFile) => {
  const { mutateAsync: upload } = useStorageUpload();

  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    let file = event.currentTarget.files && event.currentTarget.files[0];
    const uris = await upload({ data: [file] });
    updateLink(uris[0]);
  };
  return (
    <label htmlFor="myfile">
      <div className={styles.logo}>
        <Image
          src="/upload.png"
          alt="upload Logo"
          height="100"
          width="250"
        />
      </div>
      <input
        className="h-[80px]"
        id="myfile"
        type="file"
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
        style={{ display: "none" }}
        onChange={(event) => uploadFile(event)}
        />
    </label>
  );

  //const response = uploadFile(event, upload)
};


export const registerCompany = async (values: {
  name: string;
  companyname: string;
  phonenumber: string;
  companyaddress: string;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "register",
    args: [values.name, values.companyname, values.companyaddress, values.phonenumber],
  });

};

export const addCompanyCollateral = async (values: {
  acres: number;
  documenturl: string;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  property_type: string;
  property_area: string;
  prop_accessment_per_acre: number;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "addColaterals",
    args: [values.acres, values.documenturl, values.price, values.property_RegId, values.survey_zip_code, values.survey_number, values.property_type, values.property_area, values.prop_accessment_per_acre],
  });
};

export const loanRequest = async (values: {
  amount: number;
  property_RegId: number;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "loanRequest",
    args: [values.property_RegId, values.amount],
  });
};

export const retrieveCompanyCollateralInfo = async (values: {
  address: string;
  property_RegId: number;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "retrieveCompanyCollateralInfo",
    args: [values.address, values.property_RegId],
  });
};

export const loanList = async (values: {
  address: string;
  loanId: number;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "loanList",
    args: [values.address, values.loanId],
  });
};

export const collateralList = async (values: {
  address: string;
  property_RegId: number;
}) => {
  const response = await readContract({
    address: borrowerAddresses,
    abi: borrowerAbi,
    functionName: "collateralList",
    args: [values.address, values.property_RegId],
  });
};

// Registrar

export const generateRwa = async (values: {
  rwaOwner: string;
  property_RegId: number;
  price: number;
  tokenURI: string;
}) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "generateRwa",
    args: [
      values.rwaOwner,
      values.property_RegId,
      values.price,
      values.tokenURI,
    ],
  });
};

export const createNewRwa = async (values: {
  rwaOwner: string;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  tokenURI: string;
}) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "createNewRwa",
    args: [
      values.rwaOwner,
      values.property_RegId,
      values.price,
      values.survey_zip_code,
      values.survey_number,
      values.tokenURI,
    ],
  });
};

export const verificationRequest = async (values: {
  p_owner: string;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
}) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "verification_request",
    args: [
      values.p_owner,
      values.property_RegId,
      values.survey_zip_code,
      values.survey_number,
    ],
  });
};

export const transferAsset = async (values: {
  tokenId: number;
  newOwner: string;
  property_RegId: number;
}) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "transferAsset",
    args: [values.tokenId, values.newOwner, values.property_RegId],
  });
};

export const assets = async (values: { address: string; assetId: number }) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "assets",
    args: [values.address, values.assetId],
  });
};

//Lender 

export const loanRequestLender = async (values: {
  borrower: string;
  acres: number;
  amount: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  documentUri: string;
}) => {
  const response = await readContract({
    address: lenderAddresses,
    abi: lenderAbi,
    functionName: "loanRequest",
    args: [values.borrower, values.acres, values.amount, values.property_RegId, values.survey_zip_code, values.survey_number, values.documentUri],
  });
};

export const createLoanLender = async (values: {
  borrower: string;
  loan_amount_term: number;
  credit_history: number;
  approved_amount: number;
  applicant_biz_income: number;
  prop_accessment_per_acre: number;
  biz_id: string;
  property_type: string;
  property_area: string;
}) => {
  const response = await readContract({
    address: lenderAddresses,
    abi: lenderAbi,
    functionName: "create_loan",
    args: [
      values.borrower,
      values.loan_amount_term,
      values.credit_history,
      values.approved_amount,
      values.applicant_biz_income,
      values.prop_accessment_per_acre,
      values.biz_id,
      values.property_type,
      values.property_area,
    ],
  });
};

export const verificationRequestLender = async (values: {
  borrower: string;
  request_id: number;
}) => {
  const response = await readContract({
    address: lenderAddresses,
    abi: lenderAbi,
    functionName: "verification_request",
    args: [values.borrower, values.request_id],
  });
};







