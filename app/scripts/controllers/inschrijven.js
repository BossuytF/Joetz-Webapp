'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:InschrijvenCtrl
 * @description
 * # InschrijvenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('InschrijvenCtrl', ['$state', '$mdToast', '$rootScope', 'UserService', '$stateParams', 'InschrijvingService',
		function ($state, $mdToast, $rootScope, UserService, $stateParams, InschrijvingService) {

			var inschrijven = this;

			inschrijven.inschr = {
				kampId : $stateParams.kampId,
				userId : $rootScope.user.id,
				extraInformatie : '',
				betaald : false,
				goedgekeurd : false
			};

			inschrijven.betalend = {};
			inschrijven.contactpersoon = {};

			function getUser() {
				UserService.get($rootScope.user.email).then(function (response) {
					inschrijven.deelnemer = response.data;
					getBetalend();
					getContactpersoon();
				})
			}
			getUser();

			function getBetalend() {
				if (inschrijven.deelnemer.contactpersoon1.betalend) {
					inschrijven.betalend = inschrijven.deelnemer.contactpersoon1;
				} else if (inschrijven.deelnemer.contactpersoon2.betalend) {
					inschrijven.betalend = inschrijven.deelnemer.contactpersoon2;
				}
				
				if (!inschrijven.betalend){
					inschrijven.errorBetalend = "Er is nog geen betalende ouder aangesteld in het profiel, om u te kunnen inschrijven dient u eerst een ouder aan te duiden die het kamp zal betalen.";
					inschrijven.error = true;
				}
			}

			function getContactpersoon() {
				if (inschrijven.deelnemer.contactpersoon1.ouder) {
					inschrijven.contactpersoon = inschrijven.deelnemer.contactpersoon1;
				} else if (inschrijven.deelnemer.contactpersoon2.ouder) {
					inschrijven.contactpersoon = inschrijven.deelnemer.contactpersoon2;
				}
			}

			function schrijfIn() {
				InschrijvingService.create(inschrijven.inschr).then(function (response) {
					console.log(response);
					$state.go('kampdetail', {
						'kampId' : inschrijven.inschr.kampId
					});
				})
			}
			inschrijven.schrijfIn = schrijfIn;

		}
	]);
