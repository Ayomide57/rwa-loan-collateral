// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Registrar is ERC721URIStorage, Ownable {
    //Only registra can mint a Nft Property Token
    uint256 public _tokenIds;

    struct RwaVerificationRequest {
        bool verified;
        bool existed;
        address p_owner; // Address of the current property owner
        uint256 property_RegId; // property registration number
        uint256 survey_zip_code; // property zipcode
        uint256 survey_number; // property survey number
        uint256 value; // property market value
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

    constructor() ERC721("RegistrarProperties", "RPI") Ownable(msg.sender) {}

    function generateRwa(
        address _rwaOwner,
        uint256 _property_RegId,
        uint256 _value,
        string memory _tokenURI
    )
        public
        onlyOwner
        assetNotFound(_rwaOwner, _property_RegId)
        returns (uint256)
    {
        assets[_rwaOwner][_property_RegId].value = _value;
        assets[_rwaOwner][_property_RegId].verified = true;
        assets[_rwaOwner][_property_RegId].tokenId = _tokenIds;
        _mint(_rwaOwner, _tokenIds);
        _setTokenURI(_tokenIds, _tokenURI);
        // Emit event
        emit AssetVerified(
            _rwaOwner,
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
        string memory _tokenURI
    ) public onlyOwner returns (uint256) {
        assets[_rwaOwner][_property_RegId].p_owner = _rwaOwner;
        assets[_rwaOwner][_property_RegId].property_RegId = _property_RegId;
        assets[_rwaOwner][_property_RegId].survey_zip_code = _survey_zip_code;
        assets[_rwaOwner][_property_RegId].survey_number = _survey_number;
        assets[_rwaOwner][_property_RegId].value = _value;
        assets[_rwaOwner][_property_RegId].verified = true;
        assets[_rwaOwner][_property_RegId].existed = true;
        assets[_rwaOwner][_property_RegId].tokenId = _tokenIds;
        _mint(_rwaOwner, _tokenIds);
        _setTokenURI(_tokenIds, _tokenURI);
        emit AssetVerified(
            _rwaOwner,
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
        uint256 _survey_number
    ) external returns (bool) {
        assets[_p_owner][_property_RegId] = RwaVerificationRequest(
            false,
            true,
            _p_owner,
            _property_RegId,
            _survey_zip_code,
            _survey_number,
            0,
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

    function transferAsset(
        uint256 _tokenId,
        address _newOwner,
        uint256 _property_RegId
    ) external {
        // Check if the caller is the current owner of the asset
        require(ownerOf(_tokenId) == msg.sender, "You don't own this asset");

        // Transfer the token to the new owner
        _transfer(msg.sender, _newOwner, _tokenId);

        // Update asset ownership
        assets[msg.sender][_property_RegId].p_owner = _newOwner;

        // Emit event
        emit AssetTransferred(msg.sender, _newOwner, _property_RegId, _tokenId);
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

// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,  123, 100112, 133

// https://primewire.pe/trending

// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 123, "https://primewire.pe/trending", 1000000

// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 124, 1000000, 101101, 134, "https://primewire.pe/trending"

// registrar: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// Lender: 0x617F2E2fD72FD9D5503197092aC168c91465E7f2

// Borrower address: 0x17F6AD8Ef982297579C203069C1DbfFE4348c372
//lekan: 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678

// Lightout, lekan, lagos, 8147643756

// 20, ipfs://QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP/Homework1.pdf, 1000000, 123, 100112, 133, land, los angeles, 100000

//request loan
// 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678, 20, 1000000, 123, 100112, 133

// loan
// 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678, 2, 100, 100000, 150000, 10000, 1200, house, los angeles

// collateral
// 33, QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP, 1000000

// property ID 123, 100000

// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 10, 100, 80000, 100000, 123, 120ert
