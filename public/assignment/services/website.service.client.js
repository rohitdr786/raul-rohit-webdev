/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",function($http){

            var api={
                "createWebsite": createWebsite,
                "findWebsiteById":findWebsiteById,
                "deleteWebsite":deleteWebsite,
                "updateWebsite":updateWebsite,
                "findWebsitesByUser":findWebsitesByUser
            }

            function createWebsite(userId,websiteData){
                return $http.post("/api/user/"+userId+"/website",websiteData);
            }

            function deleteWebsite(websiteId){
                return $http.delete("/api/website/"+websiteId);
            }

            function updateWebsite(websiteData){
                return $http.put("/api/website/"+websiteData._id,websiteData);
            }

            function findWebsiteById(websiteId){
                return $http.get("/api/website/"+websiteId);
            }

            function findWebsitesByUser(userId){
                return $http.get("/api/user/"+userId+"/website");
            }

            return api;
        });
})();