import { chaincreditAddress, registrarAddresses } from "./contractAddresses";
import { narrow } from 'abitype'

const chaincreditAbi = narrow([
    {
        "type": "constructor",
        "inputs": [
            { "name": "_registrar", "type": "address", "internalType": "address" }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addColaterals",
        "inputs": [
            { "name": "_acres", "type": "uint8", "internalType": "uint8" },
            { "name": "_document_url", "type": "string", "internalType": "string" },
            { "name": "_price", "type": "uint256", "internalType": "uint256" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_survey_zip_code",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_survey_number",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_property_type", "type": "string", "internalType": "string" },
            { "name": "_property_area", "type": "string", "internalType": "string" },
            {
                "name": "_prop_accessment_per_acre",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [{ "name": "success", "type": "bool", "internalType": "bool" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "companyList",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [
            { "name": "company", "type": "address", "internalType": "address" },
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "owner_name", "type": "string", "internalType": "string" },
            { "name": "location", "type": "string", "internalType": "string" },
            { "name": "phone_number", "type": "uint256", "internalType": "uint256" },
            { "name": "existed", "type": "bool", "internalType": "bool" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "create_loan",
        "inputs": [
            { "name": "_borrower", "type": "address", "internalType": "address" },
            { "name": "_loan_amount_term", "type": "uint8", "internalType": "uint8" },
            { "name": "_credit_history", "type": "uint8", "internalType": "uint8" },
            {
                "name": "_approved_amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_applicant_biz_income",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_biz_id", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getCollateral",
        "inputs": [
            { "name": "_borrower", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ChainCreditContract.CollateralInfo",
                "components": [
                    {
                        "name": "verification_status",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    { "name": "status", "type": "bool", "internalType": "bool" },
                    { "name": "exist", "type": "bool", "internalType": "bool" },
                    {
                        "name": "document_url",
                        "type": "string",
                        "internalType": "string"
                    },
                    { "name": "borrower", "type": "address", "internalType": "address" },
                    { "name": "acres", "type": "uint8", "internalType": "uint8" },
                    { "name": "price", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "property_RegId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "survey_zip_code",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "survey_number",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "prop_accessment_per_acre",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "property_type",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "property_area",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCompany",
        "inputs": [
            { "name": "_borrower", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ChainCreditContract.CompanyInfo",
                "components": [
                    { "name": "company", "type": "address", "internalType": "address" },
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "owner_name", "type": "string", "internalType": "string" },
                    { "name": "location", "type": "string", "internalType": "string" },
                    {
                        "name": "phone_number",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "existed", "type": "bool", "internalType": "bool" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "loanList",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            {
                "name": "loan_state",
                "type": "uint8",
                "internalType": "enum ChainCreditContract.Status"
            },
            { "name": "borrower", "type": "address", "internalType": "address" },
            { "name": "loan_amount_term", "type": "uint8", "internalType": "uint8" },
            { "name": "credit_history", "type": "uint8", "internalType": "uint8" },
            {
                "name": "property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "loan_id", "type": "uint256", "internalType": "uint256" },
            {
                "name": "approved_amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "applicant_biz_income",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "biz_id", "type": "string", "internalType": "string" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "loanRequest",
        "inputs": [
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "register",
        "inputs": [
            { "name": "_name", "type": "string", "internalType": "string" },
            { "name": "_owner_name", "type": "string", "internalType": "string" },
            { "name": "_location", "type": "string", "internalType": "string" },
            { "name": "_phone_number", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "requestList",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            { "name": "verification_status", "type": "bool", "internalType": "bool" },
            { "name": "borrower", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            {
                "name": "property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "request_id", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            { "name": "newOwner", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verification_request",
        "inputs": [
            { "name": "_borrower", "type": "address", "internalType": "address" },
            { "name": "_request_id", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "success", "type": "bool", "internalType": "bool" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RegisterCompanyEvent",
        "inputs": [
            {
                "name": "company",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": true,
                "internalType": "string"
            },
            {
                "name": "owner_name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "location",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "phone_number",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "createLoanEvent",
        "inputs": [
            {
                "name": "_borrower",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "loan_state",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum ChainCreditContract.Status"
            },
            {
                "name": "loan_amount_term",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            },
            {
                "name": "credit_history",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            },
            {
                "name": "loan_id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "approved_amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "applicant_biz_income",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "biz_id",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "loanRequestEvent",
        "inputs": [
            {
                "name": "verification_status",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            },
            {
                "name": "borrower",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "property_RegId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "request_id",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "userCollateralEvent",
        "inputs": [
            {
                "name": "verification_status",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            },
            {
                "name": "status",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            },
            {
                "name": "document_url",
                "type": "string",
                "indexed": true,
                "internalType": "string"
            },
            {
                "name": "borrower",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "price",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "property_RegId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "survey_zip_code",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "survey_number",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "prop_accessment_per_acre",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "property_type",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "property_area",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
        ]
    }
]);

const registrarAbi = narrow([
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
    {
        "type": "function",
        "name": "_tokenIds",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "assets",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            { "name": "verified", "type": "bool", "internalType": "bool" },
            { "name": "existed", "type": "bool", "internalType": "bool" },
            { "name": "p_owner", "type": "address", "internalType": "address" },
            {
                "name": "property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "survey_zip_code",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "survey_number", "type": "uint256", "internalType": "uint256" },
            { "name": "value", "type": "uint256", "internalType": "uint256" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createNewRwa",
        "inputs": [
            { "name": "_rwaOwner", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_value", "type": "uint256", "internalType": "uint256" },
            {
                "name": "_survey_zip_code",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_survey_number",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_tokenURI", "type": "string", "internalType": "string" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "findAssets",
        "inputs": [
            { "name": "_rwaOwner", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Registrar.RwaVerificationRequest",
                "components": [
                    { "name": "verified", "type": "bool", "internalType": "bool" },
                    { "name": "existed", "type": "bool", "internalType": "bool" },
                    { "name": "p_owner", "type": "address", "internalType": "address" },
                    {
                        "name": "property_RegId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "survey_zip_code",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "survey_number",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "value", "type": "uint256", "internalType": "uint256" },
                    { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "generateRwa",
        "inputs": [
            { "name": "_rwaOwner", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_tokenURI", "type": "string", "internalType": "string" },
            { "name": "_value", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" },
            { "name": "operator", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "data", "type": "bytes", "internalType": "bytes" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" },
            { "name": "approved", "type": "bool", "internalType": "bool" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferAsset",
        "inputs": [
            { "name": "_tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "_newOwner", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            { "name": "newOwner", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "verification_request",
        "inputs": [
            { "name": "_p_owner", "type": "address", "internalType": "address" },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_survey_zip_code",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "_survey_number", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "AssetTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "_property_RegId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "AssetVerificationRequest",
        "inputs": [
            {
                "name": "p_owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "property_RegId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "survey_zip_code",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "survey_number",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "existed",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "AssetVerified",
        "inputs": [
            {
                "name": "p_owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "property_RegId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "survey_zip_code",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "survey_number",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "verified",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BatchMetadataUpdate",
        "inputs": [
            {
                "name": "_fromTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "_toTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MetadataUpdate",
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ERC721IncorrectOwner",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InsufficientApproval",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidApprover",
        "inputs": [
            { "name": "approver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOperator",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOwner",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidReceiver",
        "inputs": [
            { "name": "receiver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidSender",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721NonexistentToken",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" }
        ]
    }
]);



export { chaincreditAbi, registrarAbi, chaincreditAddress, registrarAddresses }