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

        // add some fake services
        SYBService
            .create({
                Name: "Servis " + $scope.SYBServices.length,
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." + $scope.SYBServices.length,
                Price:  + $scope.SYBServices.length,
                UserCreated: ContractService.web3.eth.coinbase,
                Category: Math.floor(Math.random() * 5)
            })
            .$promise
            .then(function(res) {
                console.log("added", res);
            });


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
            }

            return icon
        }
}]);
