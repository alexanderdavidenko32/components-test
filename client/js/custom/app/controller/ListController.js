/**
 * @author: Alexander.Davidenko
 * @date: 9/14/15
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', function ($scope, $state, componentsService) {
            $scope.components = componentsService.getLoadedComponents();

            if (!$scope.components.length) {
                componentsService.getComponents().then(function(data) {
                    $scope.components = componentsService.setLoadedComponents(data.data);

                    console.log(data);
                });
            }

        });
})();
