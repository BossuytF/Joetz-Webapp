'use strict';

/**
 * @ngdoc service
 * @name webappApp.activiteitenservice
 * @description
 * # activiteitenservice
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('ActiviteitenService', ['$http', function ($http) {

			var service = {},
			baseUrl = 'http://37.139.13.237:8085/';

			function getAll() {
				return $http.get(baseUrl + 'activiteit');
			}

			function create(activiteit) {
				return $http({
					method : 'POST',
					url : baseUrl + 'activiteit',
					data : activiteit
				});
			}

			function update(id, email) {
				return $http({
					method : 'POST',
					url : baseUrl + 'activiteit/' + id + '/aanwezigen/' + email
				});
			}

			function get(id) {
				return $http.get(baseUrl + 'activiteit/' + id);
			}

			function remove(id) {
				return $http.delete (baseUrl + 'activiteit/' + id)
			}

			function updateGegevens(activiteit) {
				return $http({
					method : 'PUT',
					url : baseUrl + 'activiteit/' + activiteit.id,
					data: activiteit
				});
			}

			service.getAll = getAll;
			service.create = create;
			service.update = update;
			service.get = get;
			service.remove = remove;
			service.updateGegevens = updateGegevens;

			return service;
		}
	]);
