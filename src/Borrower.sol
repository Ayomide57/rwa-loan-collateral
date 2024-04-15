// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Borrower is Ownable {
    // Events
    event RegisterCompanyEvent(address indexed company, string indexed name, string owner_name, string location, uint256 phone_number);
    event RequestLoanEvent(address indexed _borrower, uint8 _acres, uint256 _amount, uint256 indexed _property_RegId, uint256 _survey_zip_code, uint256 _survey_number);
    event userCollateralEvent(
        bool verification_status,
        bool status,
        //bytes32 document_hash,
        address indexed borrower,
        uint256 indexed collateral_id,
        uint256 price,
        uint256 indexed property_RegId,
        uint256 survey_zip_code,
        uint256 survey_number,
        uint256 prop_accessment_per_acre,
        string property_type,
        string property_area
    );


    uint256 private _collateral_ids;
    uint256 private _loan_ids;
    address private lender;


    
    enum Status{
        REQUEST, // Initial status by default
        PENDING, // When the Loan request is under reviews
        APPROVED, // When the load had been approve
        REJECTED // when the loan is rejected
    }


    struct CompanyInfo {
        address company;
        string name;
        string owner_name;
        string location;
        uint256 phone_number;
        bool existed;
    }

    struct CollateralInfo{
        bool verification_status;
        bool status;
        //bytes32 document_hash;
        address borrower;
        uint8 acres;//
        uint256 collateral_id;
        uint256 price;//
        uint256 property_RegId;//
        uint256 survey_zip_code;//
        uint256 survey_number;//
        uint256 prop_accessment_per_acre;//
        string property_type;//
        string property_area;//
    }

    struct Loan {
        Status loan_status;
        address company;
        uint256 collateral_id;
        uint256 amount;//
        uint256 loan_id;//
        uint256 approved_amount;
    }


    mapping (address => CompanyInfo) public companyList;
    mapping (address => mapping (uint256 => CollateralInfo)) private collateralList;
    mapping (address => mapping (uint256 => Loan)) public loanList;


    // modifiers

    modifier companyAlreadyExist {
      require(companyList[msg.sender].existed == false);
      _;
  }


    //constructor
    constructor(address _lender) Ownable(msg.sender) {
        lender = _lender;
    }


    function register(
        string memory _name,
        string memory _owner_name,
        string memory _location,
        uint256 _phone_number
    ) 
    public 
    companyAlreadyExist
    returns (bool) {
        companyList[msg.sender] = CompanyInfo(msg.sender, _name, _owner_name, _location, _phone_number, true);
        emit RegisterCompanyEvent(msg.sender, _name, _owner_name, _location, _phone_number);
        return true;
    }

    function addColaterals(
        uint8 _acres,
        //bytes6 _document_hash,
        uint256 _price,
        uint256 _property_RegId,
        uint256 _survey_zip_code,
        uint256 _survey_number,
        string memory _property_type,
        string memory _property_area,
        uint256 _prop_accessment_per_acre
    ) 
    public
    returns (bool success) {
        collateralList[msg.sender][_collateral_ids] = CollateralInfo( 
            false,
            false,
            //_document_hash,
            msg.sender,
            _acres,
            _collateral_ids,
            _price,
            _property_RegId, 
            _survey_zip_code, 
            _survey_number, 
            _prop_accessment_per_acre, 
            _property_type, 
            _property_area
        );
        emit userCollateralEvent(
            false, 
            false,
             //_document_hash, 
             msg.sender, 
             _collateral_ids, 
             _price, 
             _property_RegId, 
             _survey_zip_code, 
             _survey_number, 
             _prop_accessment_per_acre, 
             _property_type, 
             _property_area
            );
        _collateral_ids++;
        return true;
    }

    function loanRequest(
        uint256 _property_RegId,
        uint256 _amount
    ) public {
        // save Loan request information
        loanList[msg.sender][_loan_ids] = Loan(Status(0), msg.sender, _property_RegId, _amount, _loan_ids, 0);
        // retrieve the collateral information
        CollateralInfo memory collateral = collateralList[msg.sender][_property_RegId];
        //call lender contract's loan request for loan request
        (bool success, ) = lender.call(abi.encodeWithSignature("loanRequest(address, uint8, uint256, uint256, uint256, uint256)", msg.sender, collateral.acres, _amount, _property_RegId, collateral.survey_zip_code, collateral.survey_number));
        if(success){
            loanList[msg.sender][_loan_ids].loan_status = Status(1);
            emit RequestLoanEvent(msg.sender, collateral.acres, _amount, _property_RegId, collateral.survey_zip_code, collateral.survey_number);
            _loan_ids++;
        }
    }


    function retrieveCompanyCollateralInfo(address borrower, uint256 _property_RegId) public view returns (CollateralInfo memory) {
        return collateralList[borrower][_property_RegId];
    }

    /**function retrieveCompanyCollateralInfo(address borrower) public returns (CompanyFullInfo) {
        return (companyList[msg.sender], collateralList[msg.sender]);
    }**/


}
