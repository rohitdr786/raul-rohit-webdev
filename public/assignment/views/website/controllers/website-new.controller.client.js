/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",function(WebsiteService,$routeParams,$location){

            var vm=this;
            var userId=$routeParams.uid;
            vm.userId=userId;
            vm.create=createWebsite;

            function init(){
                var promise=WebsiteService.findWebsitesByUser(userId);
                promise.success(function(response){
                    vm.websites=response;
                });
                promise.error(function(){
                    vm.error="Unable to fetch websites for user ="+userId;
                });
            }
            init();

            function createWebsite(newWebsiteData){
                if(newWebsiteData!=null){
                    var promise=WebsiteService.createWebsite(userId,newWebsiteData);
                    promise.success(function(response){
                        $location.url("/user/"+response.developerId+"/website");
                    });
                    promise.error(function(){
                        vm.error="Unable to add new website";
                    });
                }
            }

        });
})();