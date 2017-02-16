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
            vm.websites=WebsiteService.findWebsitesByUser(userId);
            vm.websiteData=WebsiteService.findWebsiteById(websiteId);
            vm.delete=deleteWebsite;
            vm.update=update;

            function deleteWebsite(){
                var status=WebsiteService.deleteWebsite(websiteId);
                if(status==null){
                    vm.error="Unable to delete";
                }else{
                    $location.url("/user/"+userId+"/website");
                }
            }
            function update(updatedWebsite){
                var status=WebsiteService.updateWebsite(updatedWebsite);
                if(status==null){
                    vm.error="Unable to update";
                }else{
                    vm.message="Updated successfully";
                }
            }
        });
})();