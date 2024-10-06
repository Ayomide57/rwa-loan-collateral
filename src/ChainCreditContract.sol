// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainCreditContract is Ownable {
    /**
     * @dev This contract allows user/company to register, add collateral and apply for 
     * loans with the collateral after verification
     */

    // Errors
    error InsufficientFund(); // custom error
    error NoLoanToDisburse();
    error ZeroAddressProvided();
    error InvestorNotFound();
    error NotEligibleToWithDraw();
    error CompanyAlreadyExisted();
    error CollateralDoesntExist();
    error CollateralPreviouslyExist();
    error LoanCannotBeDisburseUnitilStatusIsApprove();

    //events

    event RegisterCompanyEvent(
        address indexed company,
        string indexed name,
        string owner_name,
        string location,
        string phone_number
    );
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
        Status loanState,
        //bytes32 agreement_hash,
        uint8 loan_amount_term,
        uint8 credit_history,
        uint256 indexed loan_id,
        uint256 approved_amount,
        uint256 applicant_biz_income,
        string biz_id,
        LoanPaymentType _paymentType
    );

    event disburseLoanEvent(
        bool loan_disbursed,
        address indexed borrower,
        uint256 indexed loan_id,
        uint256 indexed approved_amount,
        uint256 amount_in_usdt,
        uint256 amount_in_eth
    );

    // Loan Requests
    event loanRequestEvent(
        bool verification_status,
        address borrower,
        uint256 amount,
        uint256 property_RegId, //
        uint256 request_id
    );

    // Payment Loan History event
    event LoanRepaymentHistoryEvent(
        // new
        address indexed borrower,
        uint256 loan_id,
        uint256 loan_amount,
        uint256 indexed loan_repayment_history_ids
    );

    // event updateLoanEvent
    event updateLoanEvent(
        Status status,
        address indexed borrower,
        uint256 indexed loan_id
    );

    // investment event, when user deposited an amount
    event investmentEvent(
        address indexed investor,
        uint256 indexed total_amount,
        uint256 accumulated_interest,
        uint256 indexed withdrawal_date
    );

    // withdrawal event, when user withdraws their investment and profit
    event withdrawInvestmentEvent(
        address indexed investor,
        uint256 indexed total_amount_withdraw
    );

    // private counters
    uint256 private _loan_ids;
    uint256 private _request_ids;
    uint256 private _loan_repayment_history_ids;
    uint16 private immutable multiplier = 1000;
    uint32 private immutable investment_period = 365 days;
    uint256 public immutable minimum_investment = 1 ether;
    uint256 public immutable current_eth_price = 2400;
    uint8 public s_loan_rate; // loans interest rate
    uint8 public s_investor_rate; // investors interest rates

    /// @notice The oracle contract
    // ISupraOraclePull internal oracle;

    enum Status {
        REQUEST, // Initial status by default 0
        PENDING, // When the Loan request is under reviews 1
        APPROVED, // When the load had been approve 2
        REJECTED // when the loan is rejected 3
    }

    enum LoanPaymentType {
        MONTH6, // 6 month payment structure 0
        MONTH12, // 12 month payment structure 1
        MONTH18, // 18 month payment structure 2
        MONTH24, // 24 month payment structure 3
        MONTH30, // 30 month payment structure 4
        MONTH36 // 36 month payment structure 5
    }

    struct CompanyInfo {
        address company;
        string name;
        string owner_name;
        string location;
        string phone_number;
        bool existed;
    }

    struct InvestorInfo {
        address investor;
        uint256 total_amount;
        uint256 accumulated_interest;
        uint256 investment_date;
        uint256 withdrawal_date;
        bool existed;
    }

    struct CollateralInfo {
        bool verification_status;
        bool status;
        bool exist;
        string document_url;
        address borrower;
        uint8 acres; //
        uint256 price; //
        uint256 property_RegId; //
        uint256 survey_zip_code; //
        uint256 survey_number; //
        uint256 prop_accessment_per_acre; //
        string property_type; //
        string property_area; //
    }

    struct Loan {
        Status loan_state;
        LoanPaymentType loan_payment_type; // new
        bool loan_disbursed;
        address borrower;
        uint8 loan_amount_term;
        uint8 credit_history;
        uint256 property_RegId; // property registration Number
        uint256 loan_id; // loan ID
        uint256 approved_amount; // loan amount to be disbursed
        uint256 applicant_biz_income;
        uint256 total_amount_paid; // total amount of money paid so far
        string biz_id;
        address[] owners;
    }

    struct LoanRequest {
        bool verification_status;
        address borrower;
        uint256 amount;
        uint256 property_RegId; //
        uint256 request_id;
    }

    mapping(address => mapping(uint256 => LoanRequest)) public requestList;
    mapping(address => mapping(uint256 => Loan)) public loanList;
    mapping(address => CompanyInfo) public companyList;
    mapping(address => InvestorInfo) public investorList;
    mapping(address => mapping(uint256 => CollateralInfo))
        private collateralList;

    modifier companyAlreadyExist() {
        if (companyList[msg.sender].existed == true)
            revert CompanyAlreadyExisted();
        _;
    }

    modifier collateralDoesntExist(uint256 _property_RegId) {
        if (collateralList[msg.sender][_property_RegId].exist == false)
            revert CollateralDoesntExist();
        _;
    }

    modifier collateralExist(uint256 _property_RegId) {
        if (collateralList[msg.sender][_property_RegId].exist == true)
            revert CollateralPreviouslyExist();
        _;
    }

    //constructor
    constructor(uint8 _loan_rate, uint8 _investor_rate) Ownable(msg.sender) {
        //registrar = _registrar;
        s_loan_rate = _loan_rate;
        s_investor_rate = _investor_rate;
        //oracle = ISupraOraclePull(_oracle);
    }

    /**
     *  create_loan - After the property verification, then the admin will create the loan, admin can't create a loan without verifying the property details
     *
     * create loan function ensures other information of the user/company is being verified and also to register the approved amount
     *
     * @param _borrower - address of the borrower i.e person requesting for a loan
     * @param _loan_amount_term -  user loan amount term
     * @param _credit_history - user/company credit history score
     * @param _approved_amount - amount approved for the loan, during property verification, property evaluation will be done so as to compare property worth to loan request
     * @param _applicant_biz_income - company business income
     * @param _property_RegId - property government registration number
     * @param _biz_id - government issued business number/ID
     */

    function create_loan(
        //bytes32 _agreement_hash,
        address _borrower,
        uint8 _loan_amount_term,
        uint8 _credit_history,
        uint256 _approved_amount,
        uint256 _applicant_biz_income,
        uint256 _property_RegId,
        string memory _biz_id,
        LoanPaymentType _paymentType
    ) public onlyOwner {
        loanList[_borrower][_loan_ids].loan_state = Status(1);
        loanList[_borrower][_loan_ids].loan_payment_type = LoanPaymentType(
            _paymentType
        ); //new
        loanList[_borrower][_loan_ids].borrower = _borrower;
        //loanList[_borrower][_loan_ids].agreement_hash = _agreement_hash;
        loanList[_borrower][_loan_ids].property_RegId = _property_RegId;
        loanList[_borrower][_loan_ids].loan_amount_term = _loan_amount_term;
        loanList[_borrower][_loan_ids].credit_history = _credit_history;
        loanList[_borrower][_loan_ids].loan_id = _loan_ids;
        loanList[_borrower][_loan_ids].approved_amount = _approved_amount;
        loanList[_borrower][_loan_ids]
            .applicant_biz_income = _applicant_biz_income;
        loanList[_borrower][_loan_ids].biz_id = _biz_id;
        loanList[_borrower][_loan_ids].total_amount_paid = 0;
        loanList[_borrower][_loan_ids].owners.push(owner());
        loanList[_borrower][_loan_ids].owners.push(_borrower);
        emit createLoanEvent(
            _borrower,
            Status(1),
            //_agreement_hash,
            _loan_amount_term,
            _credit_history,
            _loan_ids,
            _approved_amount,
            _applicant_biz_income,
            _biz_id,
            LoanPaymentType(_paymentType)
        );
        _loan_ids++;
    }

    /**
     * Register Company - Register company information
     *
     * @param _name - name of the company
     * @param _owner_name - name of the owner of the company
     * @param _location - location of the company
     * @param _phone_number - phone number of the company
     */

    function register(
        string memory _name,
        string memory _owner_name,
        string memory _location,
        string memory _phone_number
    ) public companyAlreadyExist returns (bool) {
        companyList[msg.sender] = CompanyInfo(
            msg.sender,
            _name,
            _owner_name,
            _location,
            _phone_number,
            true
        );
        emit RegisterCompanyEvent(
            msg.sender,
            _name,
            _owner_name,
            _location,
            _phone_number
        );
        return true;
    }

    /**
     * addColaterals - Add asset/property for collateral
     * Companies are required to add collaterals before they can request for a loan
     * @param _acres - numbers of acres of lands of the property
     * @param _document_url - url of the property/assets document
     * @param _price - worth of the property
     * @param _property_RegId - property government registration number
     * @param _survey_zip_code - survey zipcode number of the property/asset
     * @param _survey_number - survey number of the property/assets
     * @param _property_type - Type of the property/asset e.g house, land, diamond, gold etc, but this only works for land and house
     * @param _property_area - property/asset area or location
     * @param _prop_accessment_per_acre - propert accessment per acre, worth per acre at that momment
     */

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
    ) public collateralExist(_property_RegId) returns (bool success) {
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

    /**
     * loanRequest - request for a loan
     * Check if collateral existed using the property registration number
     * @param _property_RegId - property government registration number
     * @param _amount - amount of requested loan
     */

    function loanRequest(
        uint256 _property_RegId,
        uint256 _amount
    ) public collateralDoesntExist(_property_RegId) {
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

    /**
     * payLoan - disburse loan to the borrower
     * @param _borrower - address of the borrower i.e person requesting for a loan
     * @param _loan_id - The Id of the created loan
     * Check the remaining balance to be paid in eth and if all had been paid, prevent user from paying loan
     */

    function payLoan(
        address _borrower,
        uint256 _loan_id
    ) public payable returns (bool success) {
        loanList[_borrower][_loan_id].total_amount_paid += msg.value;
        emit LoanRepaymentHistoryEvent(
            _borrower,
            _loan_id,
            msg.value,
            _loan_repayment_history_ids
        );
        _loan_repayment_history_ids++;
        return true;
    }

    /**
     * paymentDisbursal - disburse loan to the borrower
     * Check if _borrower address is not zero address
    * Check if loan status had been moved to Approve
    * Check if loan disbursed is equal to false, to prevent re entrancy attack/loan disbursal more than once 
     * @param _borrower - address of the borrower i.e person requesting for a loan
     * @param _loan_id - The Id of the created loan
     */

    //very expensive function
    function paymentDisbursal(
        address _borrower,
        uint256 _loan_id
    ) public onlyOwner returns (bool success) {
        if (_borrower == address(0)) revert ZeroAddressProvided();
        if (
            loanList[_borrower][_loan_id].loan_payment_type !=
            LoanPaymentType(2)
        ) revert LoanCannotBeDisburseUnitilStatusIsApprove();
        if (loanList[_borrower][_loan_id].loan_disbursed != false)
            revert NoLoanToDisburse();
        // set loan disbursed to true,to prevent re entrancy attack
        loanList[_borrower][_loan_id].loan_disbursed = true;
        //calculate total amount to be paid in usdt
        // approved amount + approved amount/loan rate
        // update loan struct with amount to be paid in eth i.e amount_to_pay/current_eth_price
        //  to prevent overflow we multiply amount_to_pay * 100/current_eth_price

        uint256 amount_to_pay_eth = (loanList[_borrower][_loan_id]
            .approved_amount +
            (loanList[_borrower][_loan_id].approved_amount / s_loan_rate) *
            100) / current_eth_price;
        // to get exact eth, amount_to_pay_eth/100, this return the amount usdt in eth
        // calculate amount to disburse in eth
        // to get the exact amount to disburse in eth (amount_to_disburse/100)
        //uint256 amount_to_disburse = ((loanList[_borrower][_loan_id].approved_amount * 100)/current_eth_price)/100;
        // Send loan approved amount to borrower, which is amount_to_disburse
        // however we will be sending 1 ether due to inability to access supra oracle
        //payable(_borrower).transfer(amount_to_disburse);
        payable(_borrower).transfer(1e18); //transfer just 1eth instead of amount_to_disburse, because we can’t afford it
        emit disburseLoanEvent(
            true,
            _borrower,
            _loan_id,
            loanList[_borrower][_loan_id].approved_amount,
            loanList[_borrower][_loan_id].approved_amount +
                (loanList[_borrower][_loan_id].approved_amount / s_loan_rate),
            amount_to_pay_eth
        );
        return true;
    }

    /**
     * updateLoan Status - update the loan status
     * check to see that only the owner/admin can update Loan status
     * @param _borrower - address of the borrower i.e person requesting for a loan
     * @param _loan_id - The Id of the created loan
     * @param _status - Status of the loan E.g pending, approved etc
     */

    function updateLoan(
        address _borrower,
        uint256 _loan_id,
        Status _status
    ) external onlyOwner returns (bool) {
        loanList[_borrower][_loan_id].loan_state = Status(_status);
        emit updateLoanEvent(_status, _borrower, _loan_id);
        return true;
    }

    /**
     * Invest - Invest minimum 1 ether into the business
     *
     */
    function invest() public payable returns (bool success) {
        if (msg.value < minimum_investment) revert InsufficientFund();
        uint256 total = (msg.value * multiplier) / s_investor_rate;
        investorList[msg.sender] = InvestorInfo(
            msg.sender,
            msg.value,
            total / multiplier,
            block.timestamp,
            block.timestamp + investment_period,
            true
        );
        emit investmentEvent(
            msg.sender,
            msg.value,
            total / multiplier,
            block.timestamp + investment_period
        );
        return success;
    }

    /**
     * WithdrawInvestment - withdraw your investment after a year of investment
     * function check to see if investor existed
     * check to see if the timer is exactly a year and more, this to ensure user doesn’t attempt to withdraw before a year
     * check to see if the contract has sufficient amount for user to withdraw
     */
    function withdrawInvestment() public returns (bool) {
        if (investorList[msg.sender].existed == false)
            revert InvestorNotFound();
        if (investorList[msg.sender].withdrawal_date > block.timestamp)
            revert NotEligibleToWithDraw();
        uint256 total_amount_withdraw = investorList[msg.sender].total_amount +
            investorList[msg.sender].accumulated_interest;
        if (address(this).balance > total_amount_withdraw)
            revert InsufficientFund();
        investorList[msg.sender].total_amount = 0;
        investorList[msg.sender].accumulated_interest = 0;
        payable(msg.sender).transfer(total_amount_withdraw);
        emit withdrawInvestmentEvent(msg.sender, total_amount_withdraw);
        return true;
    }

    function getCompany(
        address _borrower
    ) public view returns (CompanyInfo memory) {
        return companyList[_borrower];
    }

    function getLoanInformation(
        address _borrower,
        uint256 _loan_id
    ) public view returns (Loan memory) {
        return loanList[_borrower][_loan_id];
    }

    function getCollateral(
        address _borrower,
        uint256 _property_RegId
    ) public view returns (CollateralInfo memory) {
        return collateralList[_borrower][_property_RegId];
    }

    function getInvestorInfo(
        address _investor
    ) public view returns (InvestorInfo memory) {
        return investorList[_investor];
    }

    function getAmountToBePaid(
        address _borrower,
        uint256 _loan_id
    ) public view returns (uint256) {
        return
            loanList[_borrower][_loan_id].approved_amount +
            (loanList[_borrower][_loan_id].approved_amount / s_loan_rate);
    }

    receive() external payable {
        this.invest();
    }
}

