var SYBContract = artifacts.require("./SYBContract.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
	deployer.deploy(SYBContract);
	//deployer.link(ConvertLib, MetaCoin);
	//deployer.deploy(MetaCoin);
};
