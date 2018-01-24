angular
  .module('app')
  .controller('AidServicesController', ['$scope', 'SYBService', 'ContractService', function($scope, SYBService, ContractService) {
    $scope.SYBServices = [];
    
    SYBService
        .find()
        .$promise
        .then(function(SYBService) {
            $scope.SYBServices = SYBService;
        });

    // add some services to db if there is none
    if($scope.SYBServices.length < 1) {
        // add some fake services
        SYBService
            .create({
            Name: "Servis " + $scope.SYBServices.length,
            Description: "krneki " + $scope.SYBServices.length,
            Price:  + $scope.SYBServices.length,
            UserCreated: ContractService.web3.eth.coinbase,
            Category: Math.floor(Math.random() * 4)
            })
            .$promise
            .then(function(res) {
            console.log("added", res);
            });

        // add some fake services
        SYBService
            .create({
                Name: "Servis " + $scope.SYBServices.length,
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." + $scope.SYBServices.length,
                Price:  + $scope.SYBServices.length,
                UserCreated: ContractService.web3.eth.coinbase,
                Category: Math.floor(Math.random() * 4)
            })
            .$promise
            .then(function(res) {
                console.log("added", res);
            });
        }

        //$scope.categoryFilter = 0;

        $scope.readMore = function(service){
            $scope.selectedService = service;
            $('.tiny.modal').modal('show');
        }


        $scope.getCategoryIcon = function(category){
            var icon = ""
            switch(category){
                case 0:
                    icon = "tree"
                    break
                case 1:
                    icon = "comment outline"
                    break
                case 2:
                    icon = "food"
                    break
                case 3:
                    icon = "car"
                    break
            }

            return icon
        }
}]);