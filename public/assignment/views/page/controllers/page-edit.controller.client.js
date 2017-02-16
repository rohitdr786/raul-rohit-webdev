/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",function(PageService,$routeParams,$location){

            var vm=this;
            var userId=$routeParams.uid;
            var websiteId=$routeParams.wid;
            var pageId=$routeParams.pid;
            vm.userId=userId;
            vm.websiteId=websiteId;
            vm.pageId=pageId;
            vm.page=PageService.findPageById(pageId);
            vm.update=updatePage;
            vm.delete=deletePage;

            function updatePage(newPageData){
                var status=PageService.updatePage(newPageData);
                if(status==null){
                    vm.error="Unable to update";
                }else{
                    vm.message="Successfully updated";
                }
            }

            function deletePage(){
                var status=PageService.deletePage(pageId);
                if(status==null){
                    vm.error="Unable to delete";
                }else{
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                }
            }

        });
})();