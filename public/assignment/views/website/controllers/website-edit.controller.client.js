/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",function(WebsiteService,$routeParams,$location){
            var vm=this;
            var userId=$routeParams.uid;
            var websiteId=$routeParams.wid;
            vm.userId=userId;
            vm.websiteId=websiteId;
            vm.delete=deleteWebsite;
            vm.update=update;



            function init(){
                var promise=WebsiteService.findWebsitesByUser(userId);
                promise.success(function(response){
                    vm.websites=response;
                });
                promise.error(function(){
                    vm.error="Unable to fetch websites for user ="+userId;
                });

                promise=WebsiteService.findWebsiteById(websiteId);
                promise.then(function(response){
                    vm.websiteData=response.data;
                },function(){
                    vm.error="Unable to fetch website data for website ="+websiteId;
                });
            }
            init();

            function deleteWebsite(){
                var promise=WebsiteService.deleteWebsite(websiteId);
                promise.success(function(response){
                    $location.url("/user/"+userId+"/website");
                });
                promise.error(function(response){
                    vm.error="Unable to delete";
                });
            }
            function update(updatedWebsite){
                var promise=WebsiteService.updateWebsite(updatedWebsite);
                promise.then(function(response){
                    $location.url("/user/"+userId+"/website");
                },function(response){
                    vm.error="Unable to update";
                });
            }
        });
})();