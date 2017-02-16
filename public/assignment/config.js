/**
 * Created by Rohit on 15-Feb-17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'
            })
            .when("/login",{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'
            })
            .when("/register",{
                templateUrl:'views/user/templates/register.view.client.html',
                controller:'registerController',
                controllerAs:'model'
            })
            .when("/user/:uid",{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/user/:uid/website",{
                templateUrl:'views/website/templates/website-list.view.client.html',
                controller:'WebsiteListController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/new",{
                templateUrl:'views/website/templates/website-new.view.client.html',
                controller:'NewWebsiteController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:'EditWebsiteController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl:'views/page/templates/page-list.view.client.html',
                controller:'PageListController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:'views/page/templates/page-new.view.client.html',
                controller:'NewPageController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:'views/page/templates/page-edit.view.client.html',
                controller:'EditPageController',
                controllerAs:'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widget/templates/widget-choose.view.client.html'
                ,controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html'
                ,controller: "WidgetEditController",
                controllerAs: "model"
            })


    }
})();