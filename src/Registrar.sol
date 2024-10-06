// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import {RwaToken} from "./RwaToken.sol";

contract Registrar is Ownable {
    //Only registra can mint a Nft Property Token
    uint256 public _tokenIds;
    uint256 public immutable PROPERTY_TOKEN=100;

    struct RwaVerificationRequest {
        bool verified;
        bool existed;
        address p_owner; // Address of the current property owner
        address nftAddress; // The new depoyed property nft smart contract address
        uint256 property_RegId; // property registration number
        uint256 survey_zip_code; // property zipcode
        uint256 survey_number; // property survey number
        uint256 value; // property market value
        string document_url; // property uploaded url link
        uint256 tokenId; // property generated token Id
    }

    // Mapping to store asset details by owner address and property registration ID
    mapping(address => mapping(uint256 => RwaVerificationRequest))
        public assets;

    // Event to log asset transfer
    event AssetTransferred(
        address indexed previousOwner,
        address indexed newOwner,
        uint256 indexed _property_RegId,
        uint256 tokenId
    );
    event AssetVerified(
        address indexed p_owner,
        address nftAddress,
        uint256 indexed tokenId,
        uint256 indexed property_RegId,
        uint256 survey_zip_code,
        uint256 survey_number,
        uint256 value,
        bool verified
    );
    event AssetVerificationRequest(
        address indexed p_owner,
        uint256 indexed property_RegId,
        uint256 survey_zip_code,
        uint256 survey_number,
        bool existed
    );

    // modifiers
    modifier assetNotFound(address _rwaOwner, uint256 _property_RegId) {
        require(assets[_rwaOwner][_property_RegId].existed);
        _;
    }

    constructor()Ownable(msg.sender) {}

    function generateRwa(
        address _rwaOwner,
        uint256 _property_RegId,
        uint256 _value
    )
        public
        onlyOwner
        assetNotFound(_rwaOwner, _property_RegId)
        returns (uint256)
    {
        RwaToken _newRwaToken = new RwaToken( _rwaOwner, PROPERTY_TOKEN, assets[_rwaOwner][_property_RegId].document_url);
        assets[_rwaOwner][_property_RegId].nftAddress = address(_newRwaToken);
        assets[_rwaOwner][_property_RegId].value = _value;
        assets[_rwaOwner][_property_RegId].verified = true;
        assets[_rwaOwner][_property_RegId].tokenId = _tokenIds;
        // Emit event
        emit AssetVerified(
            _rwaOwner,
            address(_newRwaToken),
            _tokenIds,
            _property_RegId,
            assets[_rwaOwner][_property_RegId].survey_zip_code,
            assets[_rwaOwner][_property_RegId].survey_number,
            _value,
            true
        );
        _tokenIds++;
        return (_tokenIds - 1);
    }

    function createNewRwa(
        address _rwaOwner,
        uint256 _property_RegId,
        uint256 _value,
        uint256 _survey_zip_code,
        uint256 _survey_number,
        string memory _document_url
    ) public onlyOwner returns (uint256) {
        RwaToken _newRwaToken = new RwaToken( _rwaOwner, PROPERTY_TOKEN, _document_url);
        assets[_rwaOwner][_property_RegId].p_owner = _rwaOwner;
        assets[_rwaOwner][_property_RegId].nftAddress = address(_newRwaToken);
        assets[_rwaOwner][_property_RegId].property_RegId = _property_RegId;
        assets[_rwaOwner][_property_RegId].survey_zip_code = _survey_zip_code;
        assets[_rwaOwner][_property_RegId].survey_number = _survey_number;
        assets[_rwaOwner][_property_RegId].value = _value;
        assets[_rwaOwner][_property_RegId].verified = true;
        assets[_rwaOwner][_property_RegId].existed = true;
        assets[_rwaOwner][_property_RegId].tokenId = _tokenIds;
        emit AssetVerified(
            _rwaOwner,
            address(_newRwaToken),
            _tokenIds,
            _property_RegId,
            _survey_zip_code,
            _survey_number,
            _value,
            true
        );

        _tokenIds++;
        return (_tokenIds - 1);
    }

    function verification_request(
        address _p_owner,
        uint256 _property_RegId,
        uint256 _survey_zip_code,
        uint256 _survey_number,
        string memory _document_url
    ) external returns (bool) {
        assets[_p_owner][_property_RegId] = RwaVerificationRequest(
            false,
            true,
            _p_owner,
            address(0),
            _property_RegId,
            _survey_zip_code,
            _survey_number,
            0,
            _document_url,
            0
        );
        emit AssetVerificationRequest(
            _p_owner,
            _property_RegId,
            _survey_zip_code,
            _survey_number,
            true
        );
        return true;
    }

    function findAssets(
        address _rwaOwner,
        uint256 _property_RegId
    )
        public
        view
        assetNotFound(_rwaOwner, _property_RegId)
        returns (RwaVerificationRequest memory)
    {
        return assets[_rwaOwner][_property_RegId];
    }
}


