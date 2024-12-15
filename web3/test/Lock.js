const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateVerification", function () {
	let contract;
	let owner;
	let institution1;
	let institution2;
	let recipient1;
	let recipient2;
	let invalidInstitution;

	// Utility function to generate message hash and signature
	async function generateSignature(signer, recipient, certHash) {
		const messageHash = ethers.solidityPackedKeccak256(
			["address", "bytes32"],
			[recipient, certHash]
		);
		const signature = await signer.signMessage(
			ethers.getBytes(messageHash)
		);
		return signature;
	}

	beforeEach(async function () {
		// Deploy contract and setup accounts
		const CertificateVerification = await ethers.getContractFactory(
			"CertificateVerification"
		);
		[
			owner,
			institution1,
			institution2,
			recipient1,
			recipient2,
			invalidInstitution,
		] = await ethers.getSigners();

		contract = await CertificateVerification.deploy();
	});

	describe("Deployment", function () {
		it("Should set the deployer as the owner", async function () {
			expect(await contract.owner()).to.equal(owner.address);
		});
	});

	describe("Institution Authorization", function () {
		it("Should allow owner to authorize an institution", async function () {
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
			expect(await contract.authorizedInstitutions(institution1.address))
				.to.be.true;
		});

		it("Should emit InstitutionAuthorized event when authorizing", async function () {
			await expect(
				contract
					.connect(owner)
					.authorizeInstitution(institution1.address)
			)
				.to.emit(contract, "InstitutionAuthorized")
				.withArgs(institution1.address);
		});
		//made a change here as well
		it("Should prevent non-owner from authorizing institutions", async function () {
			await expect(
				contract
					.connect(institution1)
					.authorizeInstitution(institution2.address)
			)
				.to.be.revertedWithCustomError(
					contract,
					"OwnableUnauthorizedAccount"
				)
				.withArgs(institution1.address); // Include the expected argument if necessary
		});

		// it("Should prevent non-owner from authorizing institutions", async function () {
		// 	await expect(
		// 		contract
		// 			.connect(institution1)
		// 			.authorizeInstitution(institution2.address)
		// 	).to.be.revertedWithoutReason(); // Ownable's default revert
		// });

		it("Should prevent authorizing zero address", async function () {
			await expect(
				contract.connect(owner).authorizeInstitution(ethers.ZeroAddress)
			).to.be.revertedWith("Invalid address");
		});

		it("Should prevent re-authorizing an already authorized institution", async function () {
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
			await expect(
				contract
					.connect(owner)
					.authorizeInstitution(institution1.address)
			).to.be.revertedWith("Already authorized");
		});

		it("Should allow owner to revoke an institution", async function () {
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
			await contract
				.connect(owner)
				.revokeInstitution(institution1.address);
			expect(await contract.authorizedInstitutions(institution1.address))
				.to.be.false;
		});

		it("Should emit InstitutionRevoked event when revoking", async function () {
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
			await expect(
				contract.connect(owner).revokeInstitution(institution1.address)
			)
				.to.emit(contract, "InstitutionRevoked")
				.withArgs(institution1.address);
		});

		it("Should prevent revoking non-authorized institution", async function () {
			await expect(
				contract.connect(owner).revokeInstitution(institution1.address)
			).to.be.revertedWith("Not authorized");
		});
	});

	describe("Certificate Issuance", function () {
		beforeEach(async function () {
			// Authorize institution for testing
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
		});

		it("Should allow authorized institution to issue certificate", async function () {
			const certHash = ethers.randomBytes(32);
			const ipfsHash = "QmTestHash123";

			// Generate signature
			const signature = await generateSignature(
				institution1,
				recipient1.address,
				certHash
			);

			// Issue certificate
			await expect(
				contract
					.connect(institution1)
					.issueCertificate(
						recipient1.address,
						certHash,
						signature,
						ipfsHash
					)
			).to.emit(contract, "CertificateIssued");

			// Verify certificate details
			const [isValid, storedIpfsHash] = await contract.verifyCertificate(
				certHash,
				recipient1.address
			);
			expect(isValid).to.be.true;
			expect(storedIpfsHash).to.equal(ipfsHash);
		});

		it("Should prevent issuing certificate with invalid recipient", async function () {
			const certHash = ethers.randomBytes(32);
			const ipfsHash = "QmTestHash123";
			const signature = await generateSignature(
				institution1,
				ethers.ZeroAddress,
				certHash
			);

			await expect(
				contract
					.connect(institution1)
					.issueCertificate(
						ethers.ZeroAddress,
						certHash,
						signature,
						ipfsHash
					)
			).to.be.revertedWith("Invalid recipient");
		});

		it("Should prevent re-issuing existing certificate", async function () {
			const certHash = ethers.randomBytes(32);
			const ipfsHash = "QmTestHash123";
			const signature = await generateSignature(
				institution1,
				recipient1.address,
				certHash
			);

			// First issuance
			await contract
				.connect(institution1)
				.issueCertificate(
					recipient1.address,
					certHash,
					signature,
					ipfsHash
				);

			// Try to issue same certificate again
			await expect(
				contract
					.connect(institution1)
					.issueCertificate(
						recipient1.address,
						certHash,
						signature,
						ipfsHash
					)
			).to.be.revertedWith("Certificate exists");
		});

		it("Should prevent non-authorized institution from issuing certificate", async function () {
			const certHash = ethers.randomBytes(32);
			const ipfsHash = "QmTestHash123";
			const signature = await generateSignature(
				invalidInstitution,
				recipient1.address,
				certHash
			);

			await expect(
				contract
					.connect(invalidInstitution)
					.issueCertificate(
						recipient1.address,
						certHash,
						signature,
						ipfsHash
					)
			).to.be.revertedWith("Not authorized institution");
		});
	});

	describe("Certificate Verification", function () {
		let certHash;
		let signature;
		const ipfsHash = "QmTestHash123";

		beforeEach(async function () {
			// Authorize institution and prepare certificate
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);

			certHash = ethers.randomBytes(32);
			signature = await generateSignature(
				institution1,
				recipient1.address,
				certHash
			);

			// Issue certificate
			await contract
				.connect(institution1)
				.issueCertificate(
					recipient1.address,
					certHash,
					signature,
					ipfsHash
				);
		});

		it("Should verify valid certificate", async function () {
			const [isValid, storedIpfsHash] = await contract.verifyCertificate(
				certHash,
				recipient1.address
			);
			expect(isValid).to.be.true;
			expect(storedIpfsHash).to.equal(ipfsHash);
		});

		it("Should prevent verification of non-existent certificate", async function () {
			const randomHash = ethers.randomBytes(32);
			await expect(
				contract.verifyCertificate(randomHash, recipient1.address)
			).to.be.revertedWith("Certificate does not exist");
		});

		it("Should prevent verification of revoked certificate", async function () {
			// Revoke certificate
			await contract.connect(institution1).revokeCertificate(certHash);

			await expect(
				contract.verifyCertificate(certHash, recipient1.address)
			).to.be.revertedWith("Certificate has been revoked");
		});
	});

	describe("Certificate Revocation", function () {
		let certHash;
		let signature;
		const ipfsHash = "QmTestHash123";

		beforeEach(async function () {
			// Authorize institution and prepare certificate
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);

			certHash = ethers.randomBytes(32);
			signature = await generateSignature(
				institution1,
				recipient1.address,
				certHash
			);

			// Issue certificate
			await contract
				.connect(institution1)
				.issueCertificate(
					recipient1.address,
					certHash,
					signature,
					ipfsHash
				);
		});
		// this i am changing a bit
		it("Should allow certificate issuer to revoke their own certificate", async function () {
			await expect(
				contract.connect(institution1).revokeCertificate(certHash)
			)
				.to.emit(contract, "CertificateRevoked")
				.withArgs(certHash);

			await expect(
				contract.verifyCertificate(certHash, recipient1.address)
			).to.be.revertedWith("Certificate has been revoked");
		});

		// it("Should allow certificate issuer to revoke their own certificate", async function () {
		// 	await expect(
		// 		contract.connect(institution1).revokeCertificate(certHash)
		// 	)
		// 		.to.emit(contract, "CertificateRevoked")
		// 		.withArgs(certHash);

		// 	const [isValid] = await contract.verifyCertificate(
		// 		certHash,
		// 		recipient1.address
		// 	);
		// 	expect(isValid).to.be.false;
		// });
		//
		it("Should prevent non-issuer from revoking certificate", async function () {
			await expect(
				contract.connect(institution2).revokeCertificate(certHash)
			).to.be.revertedWith("Not authorized institution");
		});

		it("Should prevent re-revoking already revoked certificate", async function () {
			// First revocation
			await contract.connect(institution1).revokeCertificate(certHash);

			// Try to revoke again
			await expect(
				contract.connect(institution1).revokeCertificate(certHash)
			).to.be.revertedWith("Already revoked");
		});
	});

	describe("User Certificate Management", function () {
		beforeEach(async function () {
			// Authorize institution
			await contract
				.connect(owner)
				.authorizeInstitution(institution1.address);
		});

		it("Should track user certificate count", async function () {
			// Issue multiple certificates
			const certHashes = [
				ethers.randomBytes(32),
				ethers.randomBytes(32),
				ethers.randomBytes(32),
			];
			const ipfsHash = "QmTestHash123";

			for (let i = 0; i < certHashes.length; i++) {
				const signature = await generateSignature(
					institution1,
					recipient1.address,
					certHashes[i]
				);
				await contract
					.connect(institution1)
					.issueCertificate(
						recipient1.address,
						certHashes[i],
						signature,
						ipfsHash
					);
			}

			// Check certificate count
			const count = await contract.getUserCertificateCount(
				recipient1.address
			);
			expect(count).to.equal(3);
		});
		//change made
		it("Should retrieve user certificates by index", async function () {
			// Issue multiple certificates
			const certHashes = [
				ethers.randomBytes(32),
				ethers.randomBytes(32),
				ethers.randomBytes(32),
			];
			const ipfsHash = "QmTestHash123";

			for (let i = 0; i < certHashes.length; i++) {
				const signature = await generateSignature(
					institution1,
					recipient1.address,
					certHashes[i]
				);
				await contract
					.connect(institution1)
					.issueCertificate(
						recipient1.address,
						certHashes[i],
						signature,
						ipfsHash
					);
			}

			// Retrieve certificates
			const retrievedHash = await contract.getUserCertificateAtIndex(
				recipient1.address,
				1
			);

			// Convert both values to the same format
			const retrievedHashBytes = ethers.getBytes(retrievedHash); // Convert hex string to Uint8Array

			expect(retrievedHashBytes).to.deep.equal(certHashes[1]);
		});

		// it("Should retrieve user certificates by index", async function () {
		// 	// Issue multiple certificates
		// 	const certHashes = [
		// 		ethers.randomBytes(32),
		// 		ethers.randomBytes(32),
		// 		ethers.randomBytes(32),
		// 	];
		// 	const ipfsHash = "QmTestHash123";

		// 	for (let i = 0; i < certHashes.length; i++) {
		// 		const signature = await generateSignature(
		// 			institution1,
		// 			recipient1.address,
		// 			certHashes[i]
		// 		);
		// 		await contract
		// 			.connect(institution1)
		// 			.issueCertificate(
		// 				recipient1.address,
		// 				certHashes[i],
		// 				signature,
		// 				ipfsHash
		// 			);
		// 	}

		// 	// Retrieve certificates
		// 	const retrievedHash = await contract.getUserCertificateAtIndex(
		// 		recipient1.address,
		// 		1
		// 	);
		// 	expect(retrievedHash).to.deep.equal(certHashes[1]);
		// });
		//change made
		it("Should batch retrieve certificates for user", async function () {
			// Issue multiple certificates
			const certHashes = [
				ethers.randomBytes(32), // Use ethers.utils for generating bytes
				ethers.randomBytes(32),
				ethers.randomBytes(32),
			];
			const ipfsHash = "QmTestHash123";

			for (let i = 0; i < certHashes.length; i++) {
				const signature = await generateSignature(
					institution1,
					recipient1.address,
					certHashes[i]
				);
				await contract
					.connect(institution1)
					.issueCertificate(
						recipient1.address,
						certHashes[i],
						signature,
						ipfsHash
					);
			}

			// Batch retrieve certificates
			const [retrievedHashes, retrievedIpfsHashes] =
				await contract.getCertificatesForUser(recipient1.address, 0, 2);

			expect(retrievedHashes.length).to.equal(3);

			// Convert retrieved hashes to Uint8Array for comparison
			for (let i = 0; i < certHashes.length; i++) {
				const retrievedHashBytes = ethers.getBytes(retrievedHashes[i]);
				expect(retrievedHashBytes).to.deep.equal(certHashes[i]);
			}

			// Check if all IPFS hashes are as expected
			expect(retrievedIpfsHashes.every((hash) => hash === ipfsHash)).to.be
				.true;
		});

		// it("Should batch retrieve certificates for user", async function () {
		// 	// Issue multiple certificates
		// 	const certHashes = [
		// 		ethers.randomBytes(32),
		// 		ethers.randomBytes(32),
		// 		ethers.randomBytes(32),
		// 	];
		// 	const ipfsHash = "QmTestHash123";

		// 	for (let i = 0; i < certHashes.length; i++) {
		// 		const signature = await generateSignature(
		// 			institution1,
		// 			recipient1.address,
		// 			certHashes[i]
		// 		);
		// 		await contract
		// 			.connect(institution1)
		// 			.issueCertificate(
		// 				recipient1.address,
		// 				certHashes[i],
		// 				signature,
		// 				ipfsHash
		// 			);
		// 	}

		// 	// Batch retrieve certificates
		// 	const [retrievedHashes, retrievedIpfsHashes] =
		// 		await contract.getCertificatesForUser(recipient1.address, 0, 2);

		// 	expect(retrievedHashes.length).to.equal(3);
		// 	expect(retrievedHashes[0]).to.deep.equal(certHashes[0]);
		// 	expect(retrievedHashes[1]).to.deep.equal(certHashes[1]);
		// 	expect(retrievedHashes[2]).to.deep.equal(certHashes[2]);
		// 	expect(retrievedIpfsHashes.every((hash) => hash === ipfsHash)).to.be
		// 		.true;
		// });
	});
});
