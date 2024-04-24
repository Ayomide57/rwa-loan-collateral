// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainCreditContract is Ownable{

    /**
   * @dev Prints Hello World string
   */

  //events

    event RegisterCompanyEvent(address indexed company, string indexed name, string owner_name, string location, uint256 phone_number);
    event userCollateralEvent(
        bool verification_status,
        bool status,
        string indexed document_url,
        address indexed borrower,
        uint256 price,
        uint256 indexed property_RegId,
        uint256 survey_zip_code,
        uint256 survey_number,
        uint256 prop_accessment_per_acre,
        string property_type,
        string property_area
    );

        // Event 
    event createLoanEvent(
        address indexed _borrower, 
        Status loan_state, 
        //bytes32 agreement_hash,
        uint8 loan_amount_term,
        uint8 credit_history,
        uint256 indexed loan_id,
        uint256 approved_amount,
        uint256 applicant_biz_income,
        string biz_id
    );

    // Loan Requests
    event loanRequestEvent(
        bool verification_status,
        address borrower,
        uint256 amount,
        uint256 property_RegId,//
        uint256 request_id
    );



    // private counters
    uint256 private _loan_ids;
    uint256 private _request_ids;

    //address private owner;
    address registrar;

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
        bool exist;
        string document_url;
        address borrower;
        uint8 acres;//
        uint256 price;//
        uint256 property_RegId;//
        uint256 survey_zip_code;//
        uint256 survey_number;//
        uint256 prop_accessment_per_acre;//
        string property_type;//
        string property_area;//
    }


    struct Loan {
        Status loan_state;
        address borrower;
        uint8 loan_amount_term;
        uint8 credit_history;
        uint256 property_RegId;
        uint256 loan_id;
        uint256 approved_amount;
        uint256 applicant_biz_income;
        string biz_id;
        //string documentUri;
        mapping(address => bool) owners;
    }

    struct LoanRequest{
        bool verification_status;
        address borrower;
        uint256 amount;
        uint256 property_RegId;//
        uint256 request_id;
    }

    mapping (address => mapping (uint256 => LoanRequest)) public requestList;
    mapping (address => mapping (uint256 => Loan)) public loanList;
    mapping (address => CompanyInfo) public companyList;
    //collaterall uint256 = propertyId
    mapping (address => mapping (uint256 => CollateralInfo)) private collateralList;

    modifier companyAlreadyExist {
      require(companyList[msg.sender].existed == false);
      _;
  }

    modifier collateralDoesntExist(uint256 _property_RegId) {
        require(collateralList[msg.sender][_property_RegId].exist == false);
        _;
    }

    modifier collateralExist(uint256 _property_RegId) {
        require(collateralList[msg.sender][_property_RegId].exist == true);
        _;
    }


    //constructor
    constructor(address _registrar) Ownable(msg.sender) {
        registrar = _registrar;
    }


    function create_loan(
        //bytes32 _agreement_hash,
        address _borrower,
        uint8 _loan_amount_term,
        uint8 _credit_history,
        uint256 _approved_amount,
        uint256 _applicant_biz_income,
        uint256 _property_RegId,
        string memory _biz_id
    ) public  {

        loanList[_borrower][_loan_ids].loan_state = Status(1);
        loanList[_borrower][_loan_ids].borrower = _borrower;
      //loanList[_borrower][_loan_ids].agreement_hash = _agreement_hash;
        loanList[_borrower][_loan_ids].property_RegId = _property_RegId;
        loanList[_borrower][_loan_ids].loan_amount_term = _loan_amount_term;
        loanList[_borrower][_loan_ids].credit_history = _credit_history;
        loanList[_borrower][_loan_ids].loan_id = _loan_ids;
        loanList[_borrower][_loan_ids].approved_amount = _approved_amount;
        loanList[_borrower][_loan_ids].applicant_biz_income = _applicant_biz_income;
        loanList[_borrower][_loan_ids].biz_id = _biz_id;
        loanList[_borrower][_loan_ids].owners[owner()] = false;
        loanList[_borrower][_loan_ids].owners[_borrower] = false;
        emit createLoanEvent(
            _borrower, 
            Status(1), 
            //_agreement_hash, 
            _loan_amount_term, 
            _credit_history, 
            _loan_ids, 
            _approved_amount, 
            _applicant_biz_income, 
            _biz_id
        );
      _loan_ids++;
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
        string memory _document_url,
        uint256 _price,
        uint256 _property_RegId,
        uint256 _survey_zip_code,
        uint256 _survey_number,
        string memory _property_type,
        string memory _property_area,
        uint256 _prop_accessment_per_acre
    ) 
    collateralDoesntExist(_property_RegId)
    public
    returns (bool success) {
        collateralList[msg.sender][_property_RegId] = CollateralInfo( 
            false,
            false,
            true,
            _document_url,
            msg.sender,
            _acres,
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
             _document_url, 
             msg.sender, 
             _price, 
             _property_RegId, 
             _survey_zip_code, 
             _survey_number, 
             _prop_accessment_per_acre, 
             _property_type, 
             _property_area
            );
        //_collateral_ids++;
        return true;
    }


    function loanRequest(
        uint256 _property_RegId,
        uint256 _amount
    ) 
    collateralExist(_property_RegId)
    public {
        // save Loan request information

        requestList[msg.sender][_request_ids] = LoanRequest(
            false,
            msg.sender, 
            _amount, 
            _property_RegId, 
            _request_ids
        );

        emit loanRequestEvent(
            false, 
            msg.sender, 
             _amount, 
            _property_RegId, 
             _request_ids
            );
        _request_ids++;
    }


    // verification request
    function verification_request(
        address _borrower,
        uint256 _request_id
    ) 
    public 
    onlyOwner
    returns(bool success)
    {
        LoanRequest memory request = requestList[_borrower][_request_id];
        CollateralInfo memory collateral = collateralList[msg.sender][request.property_RegId];
        (success,) = registrar.call(abi.encodeWithSignature("verification_request(address, uint256, uint256, uint256)", _borrower, request.property_RegId, collateral.survey_zip_code, collateral.survey_number));
        return success;
    }

    function getCompany(address _borrower) public view returns (CompanyInfo memory) {
        return companyList[_borrower];
    }

    function getCollateral(
        address _borrower,
        uint256 _property_RegId
        ) 
    public
    view
    returns (CollateralInfo memory) {
        return collateralList[_borrower][_property_RegId];
    }
}


