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
            vm.websites=WebsiteService.findWebsitesByUser(userId);
            function createWebsite(newWebsiteData){
                if(newWebsiteData!=null){
                    var status=WebsiteService.createWebsite(userId,newWebsiteData);
                    if(status==null){
                        vm.error="Unable to add new website";
                    }else{
                        $location.url("/user/"+userId+"/website");
                    }
                }
            }

        });
})();