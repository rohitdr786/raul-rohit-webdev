/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",function(PageService,$routeParams,$location){

            var vm=this;
            var userId=$routeParams.uid;
            var websiteId=$routeParams.wid;
            vm.userId=userId;
            vm.websiteId=websiteId;
            vm.create=createPage;

            function createPage(newPageData){
                if(newPageData!=null){
                    var promise=PageService.createPage(websiteId,newPageData);
                    promise.then(function(response){
                        $location.url("/user/"+userId+"/website/"+response.data.websiteId+"/page");
                    },function(){
                        vm.error="Unable to create new page";
                    });
                }
            }

        });
})();