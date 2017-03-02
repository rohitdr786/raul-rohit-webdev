/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",function($http){

            var api={
                "createPage":createPage,
                "findPageByWebsiteId":findPageByWebsiteId,
                "findPageById":findPageById,
                "updatePage":updatePage,
                "deletePage":deletePage
            };


            function createPage(websiteId,newPageData){

                return $http.post("/api/website/"+websiteId+"/page",newPageData);

            }

            function findPageById(pageId){

                return $http.get("/api/page/"+pageId);

            }

            function updatePage(newPageData){

                return $http.put("/api/page/"+newPageData._id,newPageData);

            }

            function deletePage(pageId){

                return $http.delete("/api/page/"+pageId);

            }

            function findPageByWebsiteId(websiteId){

                return $http.get("/api/website/"+websiteId+"/page");

            }

            return api;
        });
})();