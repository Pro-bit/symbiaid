angular
    .module('app')
    .controller('AidServicesController', ['$scope', 'SYBService', 'ContractService', function ($scope, SYBService, ContractService) {
        $scope.SYBServices = [];

        SYBService
            .find()
            .$promise
            .then(function (SYBService) {
                $scope.SYBServices = SYBService;
            });

        // add some services to db if there is none
        if ($scope.SYBServices.length < 1) {
            // add some fake services
            SYBService
                .create({
                    Name: "Servis " + $scope.SYBServices.length,
                    Description: "krneki " + $scope.SYBServices.length,
                    Price: + $scope.SYBServices.length,
                    UserCreated: ContractService.web3.eth.coinbase
                })
                .$promise
                .then(function (res) {
                    console.log("added", res);
                });

            // add some fake services
            SYBService
                .create({
                    Name: "Servis " + $scope.SYBServices.length,
                    Description: "krneki " + $scope.SYBServices.length,
                    Price: + $scope.SYBServices.length,
                    UserCreated: ContractService.web3.eth.coinbase
                })
                .$promise
                .then(function (res) {
                    console.log("added", res);
                });
        }

        // get icon for category
        $scope.getCategoryIcon = function(category){
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
    .controller('AddServiceController', ['$scope', 'SYBService', '$state', 'ContractService', function ($scope, SYBService, $state, ContractService) {
        $scope.action = 'Add';
        $scope.service = {
            UserCreated: ContractService.web3.eth.coinbase,
            ServiceType: 0
        };

        $scope.serviceTypes = [
            {
                Id: 0,
                Name: "House work"
            },
            {
                Id: 1,
                Name: "Socializing"
            },
            {
                Id: 2,
                Name: "afdfas"
            },
            {
                Id: 3,
                Name: "Food transport"
            },
            {
                Id: 4,
                Name: "House work"
            },
        ];


        //$scope.categoryFilter = 0;

        $scope.readMore = function(service){
            $scope.selectedService = service;
            $('.tiny.modal').modal('show');
        }


        $scope.getCategoryIcon = function(category){
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
}]);
