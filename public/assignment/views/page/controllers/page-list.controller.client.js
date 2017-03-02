/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",function($routeParams,PageService){
            var vm=this;
            var userId=$routeParams.uid;
            var websiteId=$routeParams.wid;
            vm.userId=userId;
            vm.websiteId=websiteId;

            function init(){
                var promise=PageService.findPageByWebsiteId(websiteId);
                promise.success(function(response){
                    vm.pages=response;
                });
                promise.error(function(){
                    vm.error="Unable to fetch pages";
                });
            }
            init();

        });
})();