angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("enabled.html","\n<md-content>\n  <div class=\"center-form\">\n    <h1>enabled</h1>\n    <md-button ui-sref=\"list\">list</md-button>\n    <form name=\"listForm\">\n      <md-list>\n        <md-list-item ng-repeat=\"component in components | filter:{checked: true}  track by $index\">\n          <md-input-container ng-if=\"component.checked\">\n            <input ng-if=\"component.type == \'text\' || component.type == \'password\' || component.type == \'number\'\" name=\"{{ component.type }}\" ng-model=\"component.value\" type=\"{{ component.type }}\" step=\"1\" min=\"{{ component.validators.minValue }}\" max=\"{{ component.validators.maxValue }}\" md-minlength=\"component.validators.minLength\" md-maxlength=\"component.validators.maxLength\" required=\"component.validators.required\" aria-label=\"input\"/>\n            <div ng-if=\"component.type == \'text\' || component.type == \'password\' || component.type == \'number\'\" ng-messages=\"listForm[component.type].$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"md-maxlength\">The value has to be less than {{ component.validators.maxLength }} characters long.</div>\n              <div ng-message=\"md-minlength\">The value has to be more than {{ component.validators.minLength }} characters long.</div>\n              <div ng-message=\"max\">The value has to be less than {{ component.validators.maxValue }}.</div>\n              <div ng-message=\"min\">The value has to be more than {{ component.validators.minValue }}.</div>\n            </div>\n            <md-checkbox ng-if=\"component.type == \'checkbox\'\" name=\"{{ component.type }}\" ng-model=\"component.value\" required=\"component.validators.required\" aria-label=\"checkbox\"></md-checkbox>\n            <div ng-if=\"component.type == \'checkbox\'\" ng-messages=\"listForm[component.type].$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"md-maxlength\">The login has to be less than 30 characters long.</div>\n              <div ng-message=\"md-minlength\">The login has to be more than {{ component.validators.minlength }} characters long.</div>\n            </div>\n            <input ng-if=\"component.type == \'datepicker\'\" ng-model=\"component.value\" name=\"birthday\" type=\"hidden\" aria-label=\"input hidden\"/>\n            <textarea ng-if=\"component.type == \'textarea\'\" ng-model=\"component.value\" md-minlength=\"{{ component.validators.minLength }}\" md-maxlength=\"{{ component.validators.maxLength }}\" required=\"component.validators.required\" aria-label=\"textarea\"></textarea>\n            <div ng-if=\"component.type == \'textarea\'\" ng-messages=\"listForm[component.type].$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"md-maxlength\">The login has to be less than 30 characters long.</div>\n              <div ng-message=\"md-minlength\">The login has to be more than {{ component.validators.minlength }} characters long.</div>\n            </div>\n          </md-input-container>\n          <md-input-container ng-if=\"component.type == \'datepicker\' &amp;&amp; component.checked\">\n            <md-datepicker ng-model=\"component.value\" aria-label=\"birthday\"></md-datepicker>\n            <div ng-messages=\"listForm[component.type].$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"md-maxlength\">The login has to be less than 30 characters long.</div>\n              <div ng-message=\"md-minlength\">The login has to be more than {{ component.validators.minlength }} characters long.</div>\n            </div>\n          </md-input-container>\n        </md-list-item>\n      </md-list>\n    </form>\n  </div>\n</md-content>");
$templateCache.put("list.html","\n<md-content>\n  <div class=\"center-form\">\n    <h1>items</h1>\n    <md-button ui-sref=\"enabled\">enabled</md-button>\n    <md-input-container>\n      <label>search</label>\n      <input ng-model=\"search\" name=\"search\" autofocus=\"true\"/>\n    </md-input-container>\n    <md-list>\n      <md-list-item ng-repeat=\"component in components | filter:search track by $index\">\n        <md-checkbox ng-model=\"component.checked\"></md-checkbox>\n        <div layout=\"column\" class=\"md-list-item-text\">\n          <p>{{ component.type }}</p>\n        </div>\n      </md-list-item>\n    </md-list>\n  </div>\n</md-content>");
$templateCache.put("errors/page404.html","\n<h1>404 Not found</h1>");}]);
/**
 * @author: Alexander.Davidenko
 * @date: 9/14/15
 */
(function() {
    'use strict';

    angular.
        module('app', ['ngResource', 'ui.router', 'templates', 'ngMaterial', 'ngMessages', 'ngAnimate', 'autofocus']);
})();

/**
 * @author: Alexander.Davidenko
 * @date: 9/14/15
 */
(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($locationProvider, $httpProvider, $mdIconProvider) {
            // ie
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.useXDomain = true;

            $httpProvider.defaults.withCredentials = true;

            $locationProvider.html5Mode().enabled = true;

            //$httpProvider.interceptors.push('authInterceptor');
            //$mdIconProvider
                //.iconSet('social', 'client/vendors/svg/ic_person_black_24px.svg', 24)
                //.defaultIconSet('client/vendors/svg/ic_person_black_24px.svg', 24);
        });
})();

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
