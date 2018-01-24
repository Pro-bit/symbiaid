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

					this.SYBContract = this.web3.eth.contract(this.contractJson.abi).at("0x16E65bCaF146c326cD0CcEc18eeF17a04E0A8aED");

					def.resolve(this.SYBContract);
				});
			}

			return def.promise;
		}


		this.buy = function(service){
			/*
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

		                        });
				      });
			*/
			var def = $q.defer();

			// register with address to blockchain
			var res = this.getSYBContract().then(function(instance){

				
				instance.onCreateServiceOrder({
					serviceOrderId: service.id
				}, {
					fromBlock: 0,
					toBlock: 'latest'
				}).watch(function (error, event) {

					debugger;
				});
				

				
				instance.createServiceOrder(service.id, service.ServiceType, service.UserCreated, service.Name, service.Description, service.Price, function(err,res){

					debugger;

				})
				

			});

			return def.promise;
		}

		this.getUserAcceptedServiceOrders =function(){
			var def = $q.defer();
		    var res = this.getSYBContract().then(function(instance){
	            instance.getUserAcceptedServiceOrders(function(err, res){
	            	var pendingList = [];
	            	for(var i = 0; i<res.length; i++){
		            	instance.getService(res[i].c[0],function(err1, res2){
		            		pendingList.push(res2);
		            		if(pendingList.length == res.length){
		            			def.resolve(pendingList);
		            		}
		            	})
		            }
	                //debugger;

	            })
           })
		    return def.promise;
		}

		this.getUserDoneServiceOrders =function(){
			var def = $q.defer();
		    var res = this.getSYBContract().then(function(instance){
	            instance.getUserDoneServiceOrders(function(err, res){
	            	var pendingList = [];
	            	for(var i = 0; i<res.length; i++){
		            	instance.getService(res[i].c[0],function(err1, res2){
		            		pendingList.push(res2);
		            		if(pendingList.length == res.length){
		            			def.resolve(pendingList);
		            		}
		            	})
		            }
	                //debugger;

	            })
           })
		    return def.promise;
		}

		this.getUserPendingServiceOrders =function(){
			var def = $q.defer();
		    var res = this.getSYBContract().then(function(instance){
	            instance.getUserPendingServiceOrders(function(err, res){
	            	var pendingList = [];
	            	for(var i = 0; i<res.length; i++){
		            	instance.getService(res[i].c[0],function(err1, res2){
		            		pendingList.push(res2);
		            		if(pendingList.length == res.length){
		            			def.resolve(pendingList);
		            		}
		            	})
		            }
	            })
           })
		    return def.promise;
		}
	}]);
