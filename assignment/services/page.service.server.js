/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app,model){
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req,res){

        var websiteId=req.params["websiteId"];
        var newPageData=req.body;
        // newPageData._website=websiteId;
        model.pageModel
            .createPage(websiteId,newPageData)
            .then(function (pageData) {
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteData) {
                        websiteData.pages.push(pageData._id);
                        model.websiteModel
                            .updateWebsite(websiteId,websiteData)
                            .then(function (websiteData) {
                                res.send(pageData);
                                return;
                            },function (error) {
                                res.sendStatus(404);
                                return;
                            });
                    },function (error) {
                        res.sendStatus(404);
                        return;
                    });
            },function (error) {
                res.sendStatus(404);
                return;
            });

        // newPageData._id=(new Date()).getTime().toString();
        // pages.push(newPageData);
        // res.send(newPageData);
        // return;

    };

    function findAllPagesForWebsite(req,res){

        var websiteId=req.params["websiteId"];
        model.pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // var pageList=pages.filter(function(value){
        //     return value.websiteId===websiteId;
        // });
        // // for(p in pages){
        // //     if(pages[p].websiteId===websiteId){
        // //         pageList.push(pages[p]);
        // //     }
        // // }
        // res.send(pageList);
        // return;

    };

    function findPageById(req,res){

        var pageId=req.params["pageId"];
        model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.send(page);
                return;
            },function (error) {
                res.status(404).send("Unable to find page data for pageId ="+pageId);
                return;
            });

        // var page=pages.find(function(value){
        //     return value._id===pageId;
        // });
        // // for(p in pages){
        // //     if(pages[p]._id===pageId){
        // //         return angular.copy(pages[p]);
        // //     }
        // // }
        // // return null;
        // if(page){
        //     res.send(page);
        // }else{
        //     res.status(404).send("Unable to find page data for pageId ="+pageId);
        // }
        // return;

    };

    function updatePage(req,res){

        var pageId=req.params["pageId"];
        var newPageData=req.body;
        model.pageModel
            .updatePage(pageId,newPageData)
            .then(function (pagedata) {
                res.send(newPageData);
                return;
            },function () {
                res.status(404).send("Unable to update page for pageId ="+pageId);
                return;
            });
        // for(p in pages){
        //     if(pages[p]._id===pageId){
        //         var newPageData=req.body;
        //         pages[p].name=newPageData.name;
        //         pages[p].description=newPageData.description;
        //         res.send(newPageData);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to update page for pageId ="+pageId);
        // return;

    };

    function deletePage(req,res){

        var pageId=req.params["pageId"];
        model.pageModel
            .deletePage(pageId)
            .then(function (response) {
                res.sendStatus(200);
                return;
            },function (error) {
                res.status(404).send("Unable to delete page with pageId ="+pageId);
                return;
            });
        // for(p in pages){
        //     if(pages[p]._id===pageId){
        //         pages.splice(p,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to delete page with pageId ="+pageId);
        // return;

    };
};