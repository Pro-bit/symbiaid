// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .service('AuthService', ['$q', '$rootScope', '$state', 'ContractService', function(
      $q, $rootScope, $state, ContractService) {

    this.register = function(user) {
      // return User
      //   .create({
      //    email: email,
      //    password: password
      //  })
      //  .$promise;

      var def = $q.defer();

      // register with address to blockchain
      var res = ContractService.getSYBContract().then(function(instance) {
        instance.createUser(user.name, user.lastname, user.userAddress, function(res) {
          def.resolve(res);
        });
      });

      return def.promise;
    }

    this.isAuthenticated = function() {
      var def = $q.defer();

      // register with address to blockchain
      var res = ContractService.getSYBContract().then(function(instance) {
        // instance.payServiceOrder(3, "0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7", 5, function(err, result){
        //   debugger;
        //   def.resolve(!(_.isEmpty(result[0]) && _.isEmpty(result[1]) && _.isEmpty(result[2])));
        // });

        instance.users(ContractService.web3.eth.coinbase, function(err, result){
          def.resolve(!(_.isEmpty(result[0]) && _.isEmpty(result[1]) && _.isEmpty(result[2])));
        });
      });

      return def.promise;
    }
  }]);
