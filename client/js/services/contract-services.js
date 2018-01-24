angular
	.module('app')
	.service('ContractService', ['$q', '$rootScope', '$state', '$http', 'SYBService', function (
		$q, $rootScope, $state, $http, SYBService) {

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


		this.buy = function(service){
					//delete&create new
					SYBService
				      .deleteById({ id: service.id })
				      .$promise
				      .then(function(res) {
				      		var newService = service;
				      		delete newService["id"];
				            SYBService
		                        .create(newService)
		                        .$promise
		                        .then(function () {
		                        	debugger;
		                        	/*
		                            SYBService.find().$promise.then(function (SYBService) {
		                                $scope.SYBServices = SYBService;
		                            });
		                            */
		                        });
				      });

			var def = $q.defer();

			// register with address to blockchain
			var res = this.getSYBContract().then(function(instance){

				/*
				instance.onCreateUser({
					userAddress: ContractService.web3.eth.coinbase
				}, {
					fromBlock: 0,
					toBlock: 'latest'
				}).watch(function (error, event) {


				});
				*/

				/*
				instance.createServiceOrder(service.id, service.ServiceType, service.UserCreated, service.Name, service.Description, service.Price, function(err,res){

					debugger;

				})
				*/

			});

			return def.promise;
		}
	}]);
