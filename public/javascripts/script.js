if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js')
        .then(reg => console.log('Registration succeeded. Scope is ' + reg.scope))
        .catch(error => console.log('Registration failed with ' + error));
};

(function() {
    var mq = window.matchMedia("(max-width: 1024px)");
    var dialog = document.querySelector('dialog');
    var dialogContent = document.getElementById('dialog-content');
    if(!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $(document).on('click', '.refnum', function(event) {
        event.stopPropagation();
        var $refbody = $(this).siblings('.refbody');
        if(mq.matches) {
            dialogContent.innerHTML = $refbody.html();
            dialog.showModal();
        }
        else {
            $refbody.toggle();
        }
    });
    $(document).on('click', 'body', function(event) {
        if(mq.matches && dialog.open) {
            dialog.close();
            dialogContent.innerHTML = '';
        }
        else {
            $('.refbody').hide();
        }
    });
})();

angular.module('what-if', [ 'ngSanitize', 'ngRoute', 'ngAnimate' ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/cards.html',
                controller: 'FeedController'
            })
            .when('/article/:id', {
                templateUrl: 'partials/entry.html',
                controller: 'ArticleController'
            })
            .otherwise({
                redirectTo: '/'
            });
        // user HTML5 History API
        $locationProvider.html5Mode(true);
    })
    .service('entriesService', function() {
        var entries = {}

        return {
            getEntries: function() {
                var arr = [];
                for(var id in entries)
                    arr.push(entries[id]);
                return arr;
            },
            setEntries: function(entriesArray) {
                entries = entriesArray.reduce(function(prev, curr) {
                    prev[curr.id] = curr;
                    return prev;
                }, {});
            },
            getEntry: function(id) {
                return entries[id];
            }
        };
    })
    .directive('dynamic', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    })
    .controller('FeedController', function($rootScope, $scope, $http, $window, $timeout, entriesService) {
        console.log("FeedController handling request");
        $rootScope.header = "What If?"
        $rootScope.showBackButton = false;

        $scope.activateSearch = function() {
            $scope.isSearchActive = true;
            $timeout(function() {
                angular.element('#search').focus();
            });
        };

        $scope.deactivateSearch = function() {
            $scope.isSearchActive = false;
            $scope.searchQuery = '';
            angular.element('#search')
                .removeClass('ng-touched ng-dirty')
                .addClass('ng-untouched ng-pristine')
                .parent().removeClass('is-dirty');
        }

        $http.get("feed").then(function(response) {
            console.log("$http.get response:", response);
            $scope.entries = response.data;
            entriesService.setEntries(response.data);
        });
    })
    .controller('ArticleController', function($rootScope, $scope, $routeParams, $location, entriesService) {
        var id = $routeParams.id;
        var entry = entriesService.getEntry(id);
        console.log("ArticleController handling request for id: ", id, entry);

        if(entry) {
            $scope.entry = entry;
            $rootScope.header = entry.title;
            $rootScope.showBackButton = true;
        }
        else $location.path('/');

        $scope.goBack = function() {
            window.history.back();
        }
    });