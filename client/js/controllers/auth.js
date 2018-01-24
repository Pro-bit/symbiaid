angular
	.module('app')
	.controller('SignUpController', ['$scope', 'AuthService', 'ContractService', '$state',
		function ($scope, AuthService, ContractService, $state) {
			var registerForm = null;

			// initial load function
			this.init = function() {
				registerForm = $('.ui.form');
				registerForm.form({
					fields: {
						'first-name'  : 'empty',
						'last-name'   : 'empty',
						'user-address': 'empty',
					}
				});
			}

			// initial user setup
			$scope.user = {
				name: '',
				lastname: '',
				userAddress: '',
				address: ''
			};

			$scope.errMessage = "";

			// check if metamask is installed and address created
			if (ContractService.web3 == null)
				$scope.installMetaMask = true;


			// get current active address selected in wallet
			$scope.user.address = ContractService.web3.eth.coinbase;

			// register account function
			$scope.register = function () {
				if(registerForm.form('is valid')) {
					$scope.isRegistering = true;
					AuthService.register($scope.user)
						.then(function (err, res) {
							// check if error occurs
							if (err) {
								$scope.errMessage = err.message;
								$scope.isRegistering = false;
							} else {
								$state.transitionTo('index');
							}
						});
				}
			};

			// call init func
			this.init();
		}
	]);
