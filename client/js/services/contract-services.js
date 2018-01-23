// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .service('ContractService', ['$q', '$rootScope', '$state', '$http', function(
      $q, $rootScope, $state, $http) {
  
    // get metamask address
    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = null;
    }

    this.contractJson = null;
    this.SYBContract = null;

    this.init = function() {
      var def = $q.defer();
      var self=this;
      $http.get('SYBContract.json').success(function(response) {
        self.contractJson = response;

        self.SYBContract = self.web3.eth.contract(self.contractJson.abi).at("0x554f74026b96e96bc8b4012e6e01f2a02c84b134");
      });
    }

    this.getSYBContract = function() {
      var def = $q.defer();

      if(this.SYBContract) {
        def.resolve(this.SYBContract);
      }
      else {
        $http.get('SYBContract.json').success(function(response) {
          this.contractJson = response;
  
          this.SYBContract = this.web3.eth.contract(this.contractJson.abi).at("0x554f74026b96e96bc8b4012e6e01f2a02c84b134");

          def.resolve(this.SYBContract);
        });
      }

      return def.promise;
    }


    this.init();
  }]);
