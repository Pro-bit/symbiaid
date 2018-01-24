angular
	.module('app')
	.service('ContractService', ['$q', '$rootScope', '$state', '$http', function (
		$q, $rootScope, $state, $http) {

		// get metamask address
		if (typeof web3 !== 'undefined') {
			this.web3 = new Web3(web3.currentProvider);
		} else {
			// set the provider you want from Web3.providers
			this.web3 = null;
		}

		this.contractJson = null;
		this.SYBContract = null;

		this.getSYBContract = function () {
			var def = $q.defer();

			if (this.SYBContract) {
				def.resolve(this.SYBContract);
			}
			else {
				$http.get('SYBContract.json').success(function (response) {

					this.contractJson = response;

					this.SYBContract = this.web3.eth.contract(this.contractJson.abi).at("0x6c040A3F05f4BBC22ABd4c0988b474B879B3329A");

					def.resolve(this.SYBContract);
				});
			}

			return def.promise;
		}
	}]);
