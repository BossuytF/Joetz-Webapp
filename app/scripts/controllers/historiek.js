'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HistoriekCtrl
 * @description
 * # HistoriekCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HistoriekCtrl', ['UserService', 'InschrijvingService', 'KampenService', '$mdToast', '$mdDialog', '$scope', '$state', '$rootScope',
		function (UserService, InschrijvingService, KampenService, $mdToast, $mdDialog, $scope, $state, $rootScope) {

			var historiek = this;
			historiek.KampenLijst = [];
			historiek.InschrijvingsLijst = [];

			function getInschrijvingen() {
				UserService.get($rootScope.user.email).then(function (response) {
					historiek.user = response.data;
					for (var i = 0; i < historiek.user.inschrijvingen.length; i++) {
						InschrijvingService.get(historiek.user.inschrijvingen[i]).then(function (response) {
							historiek.InschrijvingsItem = response.data;
							historiek.InschrijvingsLijst[i] = historiek.InschrijvingsItem;
							KampenService.get(historiek.InschrijvingsItem.kamp).then(function (response) {
								historiek.KampenLijst[i] = response.data;
							});

						});

					}

				});
			}

			getInschrijvingen();

			function setKamp() {
				if (historiek.KampenLijst.length > 0) {
					historiek.detailkamp = KampenLijst[0];
				} else {
					historiek.detailkamp = {
						naam : 'Je hebt nog geen kampen meegedaan',
						gemeente : '',
						startDatum : '',
						eindDatum : '',
						omschrijving : ''
					};
				}
			}
			setKamp();

			historiek.selectKamp = function (kamp) {
				historiek.detailkamp = kamp;
			}
		}
	]);
