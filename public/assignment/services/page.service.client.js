/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",function(){

            var pages=[
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

            var api={
                "pages":pages,
                "createPage":createPage,
                "findPageByWebsiteId":findPageByWebsiteId,
                "findPageById":findPageById,
                "updatePage":updatePage,
                "deletePage":deletePage
            };


            function createPage(websiteId,newPageData){

                newPageData.websiteId=websiteId;
                newPageData._id=(new Date()).getTime().toString();
                pages.push(newPageData);
                return newPageData;

            }

            function findPageById(pageId){
                for(p in pages){
                    if(pages[p]._id===pageId){
                        return angular.copy(pages[p]);
                    }
                }
                return null;
            }

            function updatePage(newPageData){
                for(p in pages){
                    if(pages[p]._id===newPageData._id){
                        pages[p].name=newPageData.name;
                        pages[p].description=newPageData.description;
                        return "updated";
                    }
                }
                return null;
            }

            function deletePage(pageId){
                for(p in pages){
                    if(pages[p]._id===pageId){
                        pages.splice(p,1);
                        return "deleted";
                    }
                }
                return null;
            }

            function findPageByWebsiteId(websiteId){
                var pageList=[];
                for(p in pages){
                    if(pages[p].websiteId===websiteId){
                        pageList.push(pages[p]);
                    }
                }
                return pageList;
            }

            return api;
        });
})();