var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/404");

    $stateProvider
        .state('home',{
            url: "/",
            templateUrl: "app/templates/home.html"
        })
        .state("test",{
            url: "/test",
            templateUrl: "app/templates/test.html"
        })
        .state('error',{
            url: "/404",
            templateUrl: "app/templates/404.html"
        });
    $locationProvider.html5Mode(true)
});