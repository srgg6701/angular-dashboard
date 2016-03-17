var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home',{
            url: "/home",
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
});
