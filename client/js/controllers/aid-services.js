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
            UserCreated: ContractService.web3.eth.coinbase
            })
            .$promise
            .then(function(res) {
            console.log("added", res);
            });

        // add some fake services
        SYBService
            .create({
                Name: "Servis " + $scope.SYBServices.length,
                Description: "krneki " + $scope.SYBServices.length,
                Price:  + $scope.SYBServices.length,
                UserCreated: ContractService.web3.eth.coinbase
            })
            .$promise
            .then(function(res) {
                console.log("added", res);
            });
        }
}]);