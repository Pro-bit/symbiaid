angular
	.module('app')
	.service('AuthService', ['$q', '$rootScope', '$state', 'ContractService', function (
		$q, $rootScope, $state, ContractService) {

		this.register = function (user) {
			var def = $q.defer();

			// register with address to blockchain
			var res = ContractService.getSYBContract().then(function (instance) {
				// when user is created, it should go to main app immediatelly
				instance.onCreateUser({
					userAddress: ContractService.web3.eth.coinbase
				}, {
						fromBlock: 0,
						toBlock: 'latest'
					}).watch(function (error, event) {
						def.resolve(null, res);
					});

				// create new user on contract instance
				instance.createUser(user.name, user.lastname, user.userAddress, function (err, res) {
					def.resolve(err, res);
					// user created the watcher should be called
				});
			});

			return def.promise;
		}

		this.isAuthenticated = function () {
			var def = $q.defer();

			// check if user is already registered
			var res = ContractService.getSYBContract().then(function (instance) {
				instance.users(ContractService.web3.eth.coinbase, function (err, result) {
					def.resolve(!(_.isEmpty(result[0]) && _.isEmpty(result[1]) && _.isEmpty(result[2])));
				});
			});

			return def.promise;
		}
	}]);
