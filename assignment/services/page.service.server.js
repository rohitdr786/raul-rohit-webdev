/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app){
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
        newPageData.websiteId=websiteId;
        newPageData._id=(new Date()).getTime().toString();
        pages.push(newPageData);
        res.send(newPageData);
        return;

    };

    function findAllPagesForWebsite(req,res){

        var websiteId=req.params["websiteId"];
        var pageList=pages.filter(function(value){
            return value.websiteId===websiteId;
        });
        // for(p in pages){
        //     if(pages[p].websiteId===websiteId){
        //         pageList.push(pages[p]);
        //     }
        // }
        res.send(pageList);
        return;

    };

    function findPageById(req,res){

        var pageId=req.params["pageId"];
        var page=pages.find(function(value){
            return value._id===pageId;
        });
        // for(p in pages){
        //     if(pages[p]._id===pageId){
        //         return angular.copy(pages[p]);
        //     }
        // }
        // return null;
        if(page){
            res.send(page);
        }else{
            res.status(404).send("Unable to find page data for pageId ="+pageId);
        }
        return;

    };

    function updatePage(req,res){

        var pageId=req.params["pageId"];
        for(p in pages){
            if(pages[p]._id===pageId){
                var newPageData=req.body;
                pages[p].name=newPageData.name;
                pages[p].description=newPageData.description;
                res.send(newPageData);
                return;
            }
        }
        res.status(404).send("Unable to update page for pageId ="+pageId);
        return;

    };

    function deletePage(req,res){

        var pageId=req.params["pageId"];
        for(p in pages){
            if(pages[p]._id===pageId){
                pages.splice(p,1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to delete page with pageId ="+pageId);
        return;

    };
};