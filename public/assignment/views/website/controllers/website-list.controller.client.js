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
            var promise=WebsiteService.findWebsitesByUser(userId);
            promise.then(function(response){
                vm.websites=response.data;
            },function(response){
                vm.error="Unable to fetch websites for id="+userId;
            });
        });
})();
