angular
  .module('app')
  .controller('SignUpController', ['$scope', 'AuthService', 'ContractService', '$state',
      function($scope, AuthService, ContractService, $state) {
    // initial user setup
    $scope.user = {
      name: '',
      lastname: '',
      userAddress: '',
      address: ''
    };

    // check if metamask is installed and address created
    if(ContractService.web3 == null)
      $scope.installMetaMask = true;


    // get current active address selected in wallet
    $scope.user.address = ContractService.web3.eth.coinbase;

    // register account function
    $scope.register = function() {
      $scope.isRegistering = true;
      AuthService.register($scope.user)
        .then(function() {
          $scope.isRegistering = false;
          $state.transitionTo('index');
        });
    };
  }]);
