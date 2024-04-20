// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lender is Ownable{

    /**
   * @dev Prints Hello World string
   */

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

    struct Loan {
        Status loan_state;
        address borrower;
        uint8 loan_amount_term;
        uint8 credit_history;
        uint256 loan_id;
        uint256 approved_amount;
        uint256 applicant_biz_income;
        uint256 prop_accessment_per_acre;
        string property_type;
        string property_area;
        string biz_id;
        //string documentUri;
        mapping(address => bool) owners;
    }

    struct LoanRequest{
        bool verification_status;
        address borrower;
        uint8 acres;//
        uint256 amount;
        uint256 property_RegId;//
        uint256 survey_zip_code;//
        uint256 survey_number;//
        uint256 request_id;
        string documentUri;
    }

    mapping (address => mapping (uint256 => LoanRequest)) public requestList;
    mapping (address => mapping (uint256 => Loan)) public loanList;

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
        uint256 prop_accessment_per_acre,
        string property_type,
        string property_area,
        string biz_id
    );

    // Loan Requests
    event loanRequestEvent(
        bool verification_status,
        address borrower,
        uint8 acres,
        uint256 amount,
        uint256 property_RegId,
        uint256 survey_zip_code,
        uint256 survey_number,
        uint256 request_id,
        string documentUri
    );


    //constructor
    constructor(address _registrar) Ownable(msg.sender) {
        registrar = _registrar;
    }

    function loanRequest(
        address _borrower,
        uint8 _acres,
        uint256 _amount,
        uint256 _property_RegId,
        uint256 _survey_zip_code,
        uint256 _survey_number,
        string memory _documentUri
    ) 
        external 
        returns (Status)
    {

        requestList[_borrower][_request_ids] = LoanRequest(
            false,
            _borrower, 
            _acres, 
            _amount, 
            _property_RegId, 
            _survey_zip_code, 
            _survey_number,
            _request_ids,
            _documentUri
        );
        emit loanRequestEvent(
            false, 
            _borrower, 
            _acres, _amount, 
            _property_RegId, 
            _survey_zip_code,
             _survey_number, 
             _request_ids,
             _documentUri
            );
        _request_ids++;
        return Status(1);
    }

    function create_loan(
        //bytes32 _agreement_hash,
        address _borrower,
        uint8 _loan_amount_term,
        uint8 _credit_history,
        uint256 _approved_amount,
        uint256 _applicant_biz_income,
        uint256 _prop_accessment_per_acre,
        string memory _biz_id,
        string memory _property_type,
        string memory _property_area
    ) public  {

      loanList[_borrower][_loan_ids].loan_state = Status(1);
      loanList[_borrower][_loan_ids].borrower = _borrower;
      //loanList[_borrower][_loan_ids].agreement_hash = _agreement_hash;
      loanList[_borrower][_loan_ids].loan_amount_term = _loan_amount_term;
      loanList[_borrower][_loan_ids].credit_history = _credit_history;
      loanList[_borrower][_loan_ids].loan_id = _loan_ids;
      loanList[_borrower][_loan_ids].approved_amount = _approved_amount;
      loanList[_borrower][_loan_ids].applicant_biz_income = _applicant_biz_income;
      loanList[_borrower][_loan_ids].prop_accessment_per_acre = _prop_accessment_per_acre;
      loanList[_borrower][_loan_ids].property_type = _property_type;
      loanList[_borrower][_loan_ids].property_area = _property_area;
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
            _prop_accessment_per_acre, 
            _property_type, 
            _property_area, 
            _biz_id
        );
      _loan_ids++;
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
        (success,) = registrar.call(abi.encodeWithSignature("verification_request(address, uint256, uint256, uint256)", _borrower, request.property_RegId, request.survey_zip_code, request.survey_number));
        return success;
    }
}

