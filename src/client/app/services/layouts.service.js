(function() {
	'use strict';

	angular
		.module('app.services')
		.factory('Layouts', Layouts);

	Layouts.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'API_URL'];
	/* @ngInject */
	function Layouts($http, $location, $q, exception, logger, API_URL) {
		var readyPromise;

		var service = {
			gatLayout: gatLayout,
			getlayouts: getlayouts,
			ready: ready
		};

		return service;

		function gatLayout(type, name) {
			return $http.get(API_URL + '/api/layout/' + type + '/' + name)
				.then(getLayoutComplete)
				.catch(function(message) {
					exception.catcher('XHR Failed for getType')(message);
					$location.url('/');
				});

			function getLayoutComplete(data, status, headers, config) {
				return data.data;
			}
		}

		function getlayouts(type) {
			return $http.get(API_URL +'/api/layout/' + type)
				.then(getLayoutsComplete)
				.catch(function(message) {
					exception.catcher('XHR Failed for getTypes')(message);
					$location.url('/');
				});

			function getLayoutsComplete(data, status, headers, config) {
				return data.data;
			}
		}

		function getReady() {
			if (!readyPromise) {
				// Apps often pre-fetch session data ("prime the app")
				// before showing the first view.
				// This app doesn't need priming but we add a
				// no-op implementation to show how it would work.
				logger.info('Primed the app data');
				readyPromise = $q.when(service);
			}
			return readyPromise;
		}

		function ready(promisesArray) {
			return getReady()
				.then(function() {
					return promisesArray ? $q.all(promisesArray) : readyPromise;
				})
				.catch(exception.catcher('"ready" function failed'));
		}
	}
})();
