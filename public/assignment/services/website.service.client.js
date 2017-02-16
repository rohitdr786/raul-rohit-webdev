/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",function(){

            var website=[
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }

            ]

            var api={
                "website":website,
                "createWebsite": createWebsite,
                "findWebsiteById":findWebsiteById,
                "deleteWebsite":deleteWebsite,
                "updateWebsite":updateWebsite,
                "findWebsitesByUser":findWebsitesByUser
            }

            function createWebsite(userId,websiteData){
                websiteData.developerId=userId;
                websiteData._id=(new Date()).getTime().toString();
                website.push(websiteData);
                return websiteData;
            }

            function deleteWebsite(websiteId){
                for(w in website){
                    if(website[w]._id===websiteId){
                        website.splice(w,1);
                        return "deleted";
                    }
                }
                return null;

            }

            function updateWebsite(websiteData){
                for(w in website){
                    if(website[w]._id===websiteData._id){
                        website[w].name=websiteData.name;
                        website[w].description=websiteData.description;
                        return "updated";
                    }
                }
                return null;
            }

            function findWebsiteById(websiteId){
                for(w in website){
                    if(website[w]._id===websiteId){
                        return angular.copy(website[w]);
                    }
                }
                return null;
            }

            function findWebsitesByUser(userId){
                var websiteList=[];
                for(w in website){
                    if(website[w].developerId===userId){
                        websiteList.push(website[w]);
                    }
                }
                return websiteList;
            }

            return api;
        });
})();