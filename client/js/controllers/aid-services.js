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
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." + $scope.SYBServices.length,
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

        $scope.submitForm = function () {
            SYBService
                .create($scope.service)
                .$promise
                .then(function () {
                    $state.go('index');
                });
        };

        $scope.discard = function () {
            $state.go("index");
        };
    }])
    .controller('EditServiceController', ['$scope', '$q', '$stateParams', '$state', 'SYBService', function ($scope, $q, $stateParams, $state, SYBService) {
            $scope.action = 'Edit';
            $scope.service = {};

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

            SYBService.findById({ id: $stateParams.id })
                .$promise
                .then(function(data) {
                    $scope.service = data;
                });

            $scope.submitForm = function () {
                $scope.service
                    .$save()
                    .then(function () {
                        $state.go('index');
                    });
            };
    
            $scope.discard = function () {
                $state.go("index");
            };
        }]);
