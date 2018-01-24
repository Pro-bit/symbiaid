angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      // .state('add-review', {
      //   url: '/add-review',
      //   templateUrl: 'views/review-form.html',
      //   controller: 'AddReviewController',
      //   authenticate: true
      // })
      // .state('all-reviews', {
      //   url: '/all-reviews',
      //   templateUrl: 'views/all-reviews.html',
      //   controller: 'AllReviewsController'
      // })
      // .state('edit-review', {
      //   url: '/edit-review/:id',
      //   templateUrl: 'views/review-form.html',
      //   controller: 'EditReviewController',
      //   authenticate: true
      // })
      // .state('delete-review', {
      //   url: '/delete-review/:id',
      //   controller: 'DeleteReviewController',
      //   authenticate: true
      // })
      // .state('forbidden', {
      //   url: '/forbidden',
      //   templateUrl: 'views/forbidden.html',
      // })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'views/login.html',
      //   controller: 'AuthLoginController'
      // })
      // .state('logout', {
      //   url: '/logout',
      //   controller: 'AuthLogoutController'
      // })
      .state('edit-service', {
        url: '/edit-service/:id',
        templateUrl: 'views/add-service.html',
        controller: 'EditServiceController',
        authenticate: true
      })
      .state('add-service', {
        url: '/add-service',
        templateUrl: 'views/add-service.html',
        controller: 'AddServiceController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('index', {
        url: '/',
        templateUrl: 'views/aid-services.html',
        controller: 'AidServicesController',
        authenticate: true
      })
    $urlRouterProvider.otherwise('/');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
			// check if user is already registered into blockchain
			AuthService.isAuthenticated().then(function (res) {
				if (!res) {
					event.preventDefault(); //prevent current page from loading

					$rootScope.returnTo = {
						state: toState,
						params: toParams
					};

					$state.go('sign-up');
					return;
				} else {
					$state.go(toState.name == 'sign-up' ? 'index' : toState.name);
				}
			});
		});
	}]);
