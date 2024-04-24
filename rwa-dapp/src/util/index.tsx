
import { IpfsUploadBatchOptions, ThirdwebStorage } from "@thirdweb-dev/storage";
import { ChangeEvent } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";


import { readContract, writeContract } from "@wagmi/core";


//import { config } from "./config";
import {
  registrarAbi,
  chaincreditAbi,
  chaincreditAddress,
  registrarAddresses,
} from "./constants";
import { useContractRead } from "wagmi";


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
  username: string;
  companyname: string;
  phonenumber: bigint;
  address: string;
}) => {
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "register",
    args: [
      values.username,
      values.companyname,
      values.address,
      BigInt(values.phonenumber),
    ],
  });
  return response;
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
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "addColaterals",
    args: [
      values.acres,
      values.documenturl,
      BigInt(values.price),
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.property_type,
      values.property_area,
      BigInt(values.prop_accessment_per_acre),
    ],
  });
  return response;
};

export const loanRequest = async (values: {
  amount: number;
  property_RegId: number;
}) => {
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanRequest",
    args: [BigInt(values.property_RegId), BigInt(values.amount)],
  });

  return response;
};

export const loanList = async (values: {
  address: `0x${string}`;
  loanId: number;
}) => {
  const response = await readContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanList",
    args: [values.address, BigInt(values.loanId)],
  });

  return response;
  
};

export const getLoanRequestList = async (values: {
  address: `0x${string}`;
  requestId: number;
}) => {
  const response = await readContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "requestList",
    args: [values.address, BigInt(values.requestId)],
  });

  return response;
};


export const collateralList = async (values: {
  address: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await readContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "getCollateral",
    args: [values.address, BigInt(values.property_RegId)],
  });
};

// Registrar

export const generateRwa = async (values: {
  rwaOwner: `0x${string}`;
  property_RegId: number;
  price: number;
  tokenURI: string;
}) => {
  const response = await writeContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "generateRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      values.tokenURI,
      BigInt(values.price),
    ],
  });
};

export const createNewRwa = async (values: {
  rwaOwner: `0x${string}`;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  tokenURI: string;
}) => {
  const response = await writeContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "createNewRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      BigInt(values.price),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.tokenURI,
    ],
  });
  return response;
};

export const verificationRequest = async (values: {
  p_owner: `0x${string}`;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
}) => {
  const response = await writeContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "verification_request",
    args: [
      values.p_owner,
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
    ],
  });
};

export const transferAsset = async (values: {
  tokenId: number;
  newOwner: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await writeContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "transferAsset",
    args: [BigInt(values.tokenId), values.newOwner, BigInt(values.property_RegId)],
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
  amount: number;
  property_RegId: number;
}) => {
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanRequest",
    args: [
      BigInt(values.amount),
      BigInt(values.property_RegId),
    ],
  });
};

export const createLoanLender = async (values: {
  borrower: `0x${string}`;
  loan_amount_term: number;
  credit_history: number;
  approved_amount: number;
  applicant_biz_income: number;
  prop_accessment_per_acre: number;
  biz_id: string;
}) => {
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "create_loan",
    args: [
      values.borrower,
      values.loan_amount_term,
      values.credit_history,
      BigInt(values.approved_amount),
      BigInt(values.applicant_biz_income),
      BigInt(values.prop_accessment_per_acre),
      values.biz_id,
    ],
  });
};

export const verificationRequestLender = async (values: {
  borrower: `0x${string}`;
  request_id: number;
}) => {
  const response = await writeContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "verification_request",
    args: [values.borrower, BigInt(values.request_id)],
  });
};

export const getCompany = async (values: {
  borrower: `0x${string}`;
}) => {
  const response = await readContract({
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "getCompany",
    args: [values.borrower],
  });
  return response;
};







