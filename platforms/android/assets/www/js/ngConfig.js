var app = angular.module("denyseApp", ['ngRoute', 'appServices', 'ionic']);
var appServices = angular.module('appServices', []);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            title: 'Noticias',
            urlTitle: './assets/img/news.png',
            templateUrl: "views/templates/news.html",
            controller: "newsController"
        })
        .when('/news', {
            title: 'Noticias',
            urlTitle: './assets/img/news.png',
            templateUrl: "views/templates/news.html",
            controller: "newsController"
        })
        .when('/newsDetails/:newsId', {
            title: '',
            urlTitle: '',
            templateUrl: "views/details/newsDetails.html",
            controller: "newsDetailsController"
        })
        .when("/shows", {
            title: 'Conciertos',
            urlTitle: './assets/img/shows.png',
            templateUrl: "views/templates/shows.html",
            controller: "showsController"
        })
        .when('/showsDetails/:showsId', {
            title: '',
            urlTitle: '',
            templateUrl: "views/details/showsDetails.html",
            controller: "showsDetailsController"
        })
        .when("/videos", {
            title: 'Videos',
            urlTitle: './assets/img/videos.png',
            templateUrl: "views/templates/videos.html",
            controller: "videosController"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.urlTitle = current.$$route.urlTitle;
    });
}]);
