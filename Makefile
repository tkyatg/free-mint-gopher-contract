init:
	rm -rf node_modules
	npm install
node:
	npx hardhat node
testing:
	npx hardhat test --network localhost
build:
	npx hardhat compile
deploy-goerli:
	npx hardhat run scripts/deploy.ts --network goerli