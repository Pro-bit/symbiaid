var SYBContract = artifacts.require("./SYBContract.sol");

module.exports = function(deployer) {
	deployer.deploy(SYBContract);
};
