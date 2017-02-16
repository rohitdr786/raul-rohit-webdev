/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",function($routeParams,WebsiteService){

            var vm=this;
            var userId=$routeParams.uid;
            vm.userId=userId;
            vm.websites=WebsiteService.findWebsitesByUser(userId);
        });
})();
