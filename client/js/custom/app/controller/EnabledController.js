/**
 * @author: Alexander.Davidenko
 * @date: 9/14/15
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('EnabledController', function ($scope, $state, componentsService) {
            $scope.components = componentsService.getLoadedComponents();
        });
})();
