/**
 * @author: Alexander.Davidenko
 * @date: 9/14/15
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/error/404');

            $stateProvider
                .state('404', {
                    url: '/error/404',
                    templateUrl: 'errors/page404.html'
                })
                .state('list', {
                    url: '/',
                    text: 'Components list',
                    templateUrl: 'list.html',
                    controller: 'ListController'
                })
                .state('enabled', {
                    url: '/enabled',
                    text: 'Enabled components',
                    templateUrl: 'enabled.html',
                    controller: 'EnabledController'
                });
        });
})();
