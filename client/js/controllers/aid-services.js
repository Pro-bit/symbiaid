angular
    .module('app')
    .controller('AidServicesController', ['$scope', 'SYBService', 'ContractService', function ($scope, SYBService, ContractService){
        $scope.SYBServices = [];
        $scope.userId = ContractService.web3.eth.coinbase;

        SYBService
            .find()
            .$promise
            .then(function (SYBService) {
                $scope.SYBServices = SYBService;
            });

        // add some fake services
        /*
        SYBService
            .create({
                Name: "Servis " + $scope.SYBServices.length,
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." + $scope.SYBServices.length,
                Price:  + $scope.SYBServices.length,
                UserCreated: ContractService.web3.eth.coinbase,
                ServiceType: Math.floor(Math.random() * 5)
            })
            .$promise
            .then(function(res) {
                console.log("added", res);
            });
        */

        /*
          web3.eth.getBalance(address, function (error, result) {
            if (!error) {
              console.log(result.toNumber());
            } else {
              console.error(error);
            }
          })
        */


        $scope.showEdit = function(userId){
            return $scope.userId == userId?true:false;
        }

        $scope.addEditService = function(id){
            
            if(id){
                SYBService.findById({ id: id })
                    .$promise
                    .then(function(data) {
                        $scope.service = data;
                });
            }else{
                $scope.service = {
                    UserCreated: $scope.userId,
                    ServiceType: 0
                }; 
            }


            $scope.serviceTypes = [
                {
                    Id: 0,
                    Name: "House work"
                },
                {
                    Id: 1,
                    Name: "Landscaping"
                },
                {
                    Id: 2,
                    Name: "Socializing"
                },
                {
                    Id: 3,
                    Name: "Food"
                },
                {
                    Id: 4,
                    Name: "Transport"
                },
            ];

            $scope.submitForm = function () {

                if(id){
                    $scope.service
                        .$save()
                        .then(function () {
                            SYBService.find().$promise.then(function (SYBService) {
                                $scope.SYBServices = SYBService;
                            });
                        });
                }else{
                    SYBService
                        .create($scope.service)
                        .$promise
                        .then(function () {
                            SYBService.find().$promise.then(function (SYBService) {
                                $scope.SYBServices = SYBService;
                            });
                        });
                }
                $('.tiny.modal.addService').modal('hide'); 
            };

            $scope.discard = function () {
                $('.tiny.modal.addService').modal('hide'); 
            };

            $('.tiny.modal.addService').modal('show');
        }



        $scope.readMore = function(service){
            $scope.selectedService = service;
            $('.tiny.modal.showMore').modal('show');
        }

        $scope.buyService = function(service){
            ContractService.buy(service).then(function(res){
                debugger;
            })
        }


        $scope.getServiceTypeIcon = function(category){
            var icon = ""
            switch(category){
                case 0:
                    icon = "home"
                    break
                case 1:
                    icon = "tree"
                    break
                case 2:
                    icon = "comment outline"
                    break
                case 3:
                    icon = "food"
                    break
                case 4:
                    icon = "car"
                    break
                case 5:
                    icon = "grid layout"
                    break
            }

            return icon
        }
    }])

    .controller('DoneServicesController', ['$scope', 'SYBService', '$state', 'ContractService', function ($scope, SYBService, $state, ContractService) {
        var res = ContractService.getUserDoneServiceOrders().then(function(res){
            $scope.doneServices = res;
        })
 
    }])

     .controller('HistoryServicesController', ['$scope', 'SYBService', '$state', 'ContractService', function ($scope, SYBService, $state, ContractService) {
        var res = ContractService.getUserAcceptedServiceOrders().then(function(res){
            $scope.historyServices = res;
        })

        $scope.onPay = function(service) {
            debugger;
            ContractService.payServiceOrder(id, recip, score).then(function(res) {
                debugger;
            })
        }
  
    }])

    .controller('PendingServicesController', ['$scope', 'SYBService', '$state', 'ContractService', function ($scope, SYBService, $state, ContractService) {
       
       $scope.categoryName = function(id){
        return ["House work", "Landscaping", "Socializing", "Food", "Transport"][id];
       }

       var res = ContractService.getUserPendingServiceOrders().then(function(res){
            $scope.pendingServices = res;
       })

    }])
  
