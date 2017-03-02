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
            vm.update=updatePage;
            vm.delete=deletePage;

            function init(){

                var promise=PageService.findPageById(pageId);
                promise.then(function(response){
                    vm.page=response.data;
                },function(){
                    vm.error="Unable to fetch page data";
                });

            }
            init();

            function updatePage(newPageData){

                var promise=PageService.updatePage(newPageData);
                promise.success(function(response){
                    vm.message="Successfully updated";
                });
                promise.error(function(){
                    vm.error="Unable to update";
                });

            }

            function deletePage(){

                var promise=PageService.deletePage(pageId);
                promise.then(function(response){
                    $location.url("/user/"+userId+"/website/"+response.data.websiteId+"/page");
                },function(){
                    vm.error="Unable to delete";
                });

            }

        });
})();