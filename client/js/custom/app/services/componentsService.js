/**
 * @author: Alexander.Davidenko
 * @date: 9/21/15
 */
(function () {
    'use strict';

    angular
        .module('app')
        .service('componentsService', function ($resource) {
            var components = {},
                loadedComponents = [];

            components.getComponents = function () {
                var componentsList = $resource('/components', {}, {
                    read: {method: 'GET'}
                });

                return componentsList.read().$promise;
            };
            components.getLoadedComponents = function () {
                return loadedComponents;
            };
            components.setLoadedComponents = function(data) {
                return loadedComponents = data;
            }

            return components;
        });
})();
