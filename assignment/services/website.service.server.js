/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app){
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deletewebsite);

    var website=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }

    ]

    function createWebsite(req,res){
        var userId=req.params["userId"];
        var websiteData=req.body;
        websiteData.developerId=userId;
        websiteData._id=(new Date()).getTime().toString();
        website.push(websiteData);
        res.send(websiteData);
        return;
    }

    function findAllWebsitesForUser(req,res){
        var userId=req.params["userId"];
        var websiteList=[];
        for(w in website){
            if(website[w].developerId===userId){
                websiteList.push(website[w]);
            }
        }
        res.send(websiteList);
        return;
    }

    function findWebsiteById(req,res){
        var websiteId=req.params["websiteId"];
        for(w in website){
            if(website[w]._id===websiteId){
                res.send(website[w]);
                return;
            }
        }
        res.status(404).send("Unable to find website ="+websiteId);
    }

    function updateWebsite(req,res){
        var websiteId=req.params["websiteId"];
        for(w in website){
            if(website[w]._id===websiteId){
                var websiteData=req.body;
                website[w].name=websiteData.name;
                website[w].description=websiteData.description;
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to website ="+websiteId);
    }

    function deletewebsite(req,res){
        var websiteId=req.params["websiteId"];
        for(w in website){
            if(website[w]._id===websiteId){
                website.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to delete website ="+ websiteId);
    }
};