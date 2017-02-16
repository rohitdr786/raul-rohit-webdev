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
            vm.pages=PageService.findPageByWebsiteId(websiteId);

        });
})();