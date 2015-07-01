(function () {
    'use strict';

    angular.module('app.models')
        .factory('BlockDao', BlockDao);

    BlockDao.$inject = ['$http', 'API_URL', 'exception', '$location'];
		function BlockDao($http, API_URL, exception, $location) {
				var readyPromise;

			var service = {
				getBlocks: getBlocks,
				getBlockByName: getBlockByName,
				saveBlock: saveBlock,
				removeBlock: removeBlock,
				updateBlock: updateBlock,
				ready: ready
			};

			return service;

			function getBlocks() {
				return $http.get(API_URL +'/api/block/')
					.then(getBlocksComplete)
					.catch(function(message) {
						exception.catcher('XHR Failed for getBlocks')(message);
						$location.url('/');
					});

				function getBlocksComplete(data, status, headers, config) {
					return data;
				}
			}

			function getBlockByName(name) {
				return $http.get(API_URL +'/api/block/' + name)
					.then(getBlocksComplete)
					.catch(function(message) {
						exception.catcher('XHR Failed for getBlocks')(message);
						$location.url('/');
					});

				function getBlocksComplete(data, status, headers, config) {
					return data;
				}
			}

			function saveBlock(block) {
				return $http.post(API_URL + '/api/block/',
					{block: block})
					.then(saveBlockComplete)
					.catch(function(message) {
						exception.catcher('XHR Failed for saveBlock')(message);
						$location.url('/');
					});

				function saveBlockComplete(data, status, headers, config) {
					return data.data;
				}
			}

			function updateBlock(block) {
				return $http.put(API_URL + '/api/block/' + block.name,
					{block: block})
					.then(updateBlockComplete)
					.catch(function(message) {
						exception.catcher('XHR Failed for updateBlock')(message);
						$location.url('/');
					});

				function updateBlockComplete(data, status, headers, config) {
					return data.data;
				}
			}

			function removeBlock(name) {
				return $http.delete(API_URL + '/api/block/' + name)
					.then(removeBlockComplete)
					.catch(function(message) {
						exception.catcher('XHR Failed for removeBlock')(message);
						$location.url('/');
					});

				function removeBlockComplete(data, status, headers, config) {
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
