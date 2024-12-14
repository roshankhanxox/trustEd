// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract CertificateVerification is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct Certificate {
        address issuer;
        bytes signature;
        uint256 issuedAt;
        bool isValid;
        string ipfsHash; // Store IPFS hash of the certificate image
    }

    // Mappings
    mapping(address => bool) public authorizedInstitutions;
    mapping(bytes32 => Certificate) public certificates;

    // Gas optimization: Instead of array, store certificate count and individual mappings
    mapping(address => uint256) public userCertificateCount;
    mapping(address => mapping(uint256 => bytes32))
        public userCertificateByIndex;
    mapping(bytes32 => bool) public certificateExistsForUser;

    // Events
    event CertificateIssued(
        bytes32 indexed certHash,
        address indexed issuer,
        address indexed recipient,
        string ipfsHash
    );
    event CertificateVerified(
        bytes32 indexed certHash,
        address indexed verifier
    );
    event InstitutionAuthorized(address indexed institution);
    event InstitutionRevoked(address indexed institution);
    event CertificateRevoked(bytes32 indexed certHash);

    // Modifiers
    modifier onlyAuthorizedInstitution() {
        require(
            authorizedInstitutions[msg.sender],
            "Not authorized institution"
        );
        _;
    }

    // Institution Management Functions
    function authorizeInstitution(address institution) external onlyOwner {
        require(institution != address(0), "Invalid address");
        require(!authorizedInstitutions[institution], "Already authorized");

        authorizedInstitutions[institution] = true;
        emit InstitutionAuthorized(institution);
    }

    function revokeInstitution(address institution) external onlyOwner {
        require(authorizedInstitutions[institution], "Not authorized");

        authorizedInstitutions[institution] = false;
        emit InstitutionRevoked(institution);
    }

    // Certificate Issuance Function - Gas Optimized
    function issueCertificate(
        address recipient,
        bytes32 certHash,
        bytes calldata signature, // Use calldata for gas optimization
        string calldata ipfsHash // IPFS hash of certificate image
    ) external onlyAuthorizedInstitution {
        require(recipient != address(0), "Invalid recipient");
        require(
            certificates[certHash].issuer == address(0),
            "Certificate exists"
        );
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");

        // Verify signature - moved to a separate function to avoid stack too deep
        _verifySignature(recipient, certHash, signature);

        // Store certificate with IPFS hash
        certificates[certHash] = Certificate({
            issuer: msg.sender,
            signature: signature,
            issuedAt: block.timestamp,
            isValid: true,
            ipfsHash: ipfsHash
        });

        // Gas efficient way to store user's certificates
        uint256 currentIndex = userCertificateCount[recipient];
        userCertificateByIndex[recipient][currentIndex] = certHash;
        userCertificateCount[recipient] = currentIndex + 1;
        certificateExistsForUser[certHash] = true;

        emit CertificateIssued(certHash, msg.sender, recipient, ipfsHash);
    }

    // Signature verification helper function
    function _verifySignature(
        address recipient,
        bytes32 certHash,
        bytes memory signature
    ) internal view {
        bytes32 messageHash = keccak256(abi.encodePacked(recipient, certHash));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == msg.sender, "Invalid signature");
    }

    // Certificate Verification Function - Gas Optimized
    function verifyCertificate(
        bytes32 certHash,
        address recipient
    ) external view returns (bool, string memory) {
        Certificate memory cert = certificates[certHash];
        require(cert.issuer != address(0), "Certificate does not exist");
        require(cert.isValid, "Certificate has been revoked");
        require(authorizedInstitutions[cert.issuer], "Issuer not authorized");
        require(certificateExistsForUser[certHash], "Not issued to recipient");

        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(recipient, certHash));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedMessageHash.recover(cert.signature);
        require(recoveredSigner == cert.issuer, "Invalid signature");

        return (true, cert.ipfsHash);
    }

    // Revocation function
    function revokeCertificate(
        bytes32 certHash
    ) external onlyAuthorizedInstitution {
        require(
            certificates[certHash].issuer == msg.sender,
            "Not certificate issuer"
        );
        require(certificates[certHash].isValid, "Already revoked");

        certificates[certHash].isValid = false;
        emit CertificateRevoked(certHash);
    }

    // Gas-efficient getter functions
    function getUserCertificateCount(
        address user
    ) external view returns (uint256) {
        return userCertificateCount[user];
    }

    function getUserCertificateAtIndex(
        address user,
        uint256 index
    ) external view returns (bytes32) {
        require(index < userCertificateCount[user], "Index out of bounds");
        return userCertificateByIndex[user][index];
    }

    // Batch get function for frontend efficiency
    function getCertificatesForUser(
        address user,
        uint256 startIndex,
        uint256 endIndex
    )
        external
        view
        returns (bytes32[] memory certHashes, string[] memory ipfsHashes)
    {
        require(endIndex >= startIndex, "Invalid range");
        require(endIndex < userCertificateCount[user], "Index out of bounds");

        uint256 length = endIndex - startIndex + 1;
        certHashes = new bytes32[](length);
        ipfsHashes = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            bytes32 certHash = userCertificateByIndex[user][startIndex + i];
            certHashes[i] = certHash;
            ipfsHashes[i] = certificates[certHash].ipfsHash;
        }

        return (certHashes, ipfsHashes);
    }

    // Constructor to call Ownable constructor
    constructor() Ownable(msg.sender) {
        // Optionally, you can pass a specific initial owner address here
        // Call authorizeInstitution with your current address
    }
}
