init:
	rm -rf node_modules
	npm install
node:
	npx hardhat node
testing:
	npx hardhat test --network localhost
build:
	npx hardhat compile
deploy-mumbai:
	npx hardhat run scripts/deploy.js --network mumbai
deploy-test:
	npx hardhat run scripts/deploy.js --network ropsten
deploy-gl-test:
	npx hardhat run scripts/deploy.js --network rinkeby
deploy-prod: