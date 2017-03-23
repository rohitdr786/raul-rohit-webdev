/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app,model){
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    app.put("/api/page/:pageId/widget",updateWidgetIndex);
    
    // var widgets = [
        //     {
        //         "_id": "123",
        //         "name": "Main Header",
        //         "widgetType": "HEADER",
        //         "pageId": "321",
        //         "size": "2",
        //         "gridLoc":1,
        //         "text": "GIZMODO"
        //     },
        //     {
        //         "_id": "234",
        //         "name": "Paragraph Header",
        //         "widgetType": "HEADER",
        //         "pageId": "321",
        //         "size": "4",
        //         "gridLoc":2,
        //         "text": "Lorem ipsum"
        //     },
        //     {
        //         "_id": "345", "name": "Illus. Image", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "gridLoc":3,
        //         "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
        //     },
        //     {
        //         "_id": "456", "name": "Paragraph Text",
        //         "widgetType": "HTML",
        //         "pageId": "321",
        //         "gridLoc":4,
        //         "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
        //     },
        //     {
        //         "_id": "567",
        //         "name": "Image Caption",
        //         "widgetType": "HEADER",
        //         "pageId": "321",
        //         "size": "4",
        //         "gridLoc":5,
        //         "text": "Lorem ipsum"
        //     },
        //     {
        //         "_id": "678", "name": "Content Video", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "gridLoc":6,
        //         "url": "https://www.youtube.com/embed/Kl5B6MBAntI"
        //     },
        //     {
        //         "_id": "789",
        //         "name": "Video Description",
        //         "widgetType": "HTML",
        //         "pageId": "321",
        //         "gridLoc":7,
        //         "text": "<p>Lorem ipsum</p>"
        //     },
        //     {
        //         "_id": "789",
        //         "name": "Video Description",
        //         "widgetType": "HTML",
        //         "pageId": "654",
        //         "gridLoc":1,
        //         "text": "<p>Odd man out</p>"
        //     },
        //     {
        //         "_id": "456",
        //         "name": "Video Description",
        //         "widgetType": "HTML",
        //         "pageId": "654",
        //         "gridLoc":2,
        //         "text": "<p>Odd man out 1</p>"
        //     }
        // ];

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        // console.log("filename="+filename);
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function (widgetData) {
                widgetData.url = '/uploads/'+filename;
                widgetData.save();
                var callbackUrl="/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                res.redirect(callbackUrl);
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // widget = getWidgetById(widgetId);
        // widget.url = '/uploads/'+filename;
        // var callbackUrl="/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        // res.redirect(callbackUrl);
    }

    function getWidgetById(wid){
        model.widgetModel
            .findWidgetById(wid)
            .then(function (widgetData) {
                res.send(widgetData);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // return widgets.find(function(value){
        //     return value._id==wid;
        // });
    }
    function createWidget(req,res){

        var pageId=req.params["pageId"];
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                var widget=req.body;
                widget.gridLoc=widgets.length+1;
                model.widgetModel
                    .createWidget(pageId,widget)
                    .then(function (widget) {
                        res.send(widget._id);
                        return;
                    },function (error) {
                        res.sendStatus(404);
                        return;
                    });
            },function (error) {
                res.sendStatus(404);
                return;
            });

        // var widget=req.body;
        // widget.pageId = pageId;
        // widget._id = new Date().getTime().toString();
        // var w=widgets.filter(function(wid){
        //     return pageId===wid.pageId;
        // });
        // widget.gridLocation=w.length+1;
        // widgets.push(widget);
        // res.send(widget._id);
    }

    function findAllWidgetsForPage(req,res){

        var pageId=req.params["pageId"];
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // var pageWidgets = [];
        // for (var wg in widgets) {
        //     if (widgets[wg].pageId === pageId) {
        //         pageWidgets.push(widgets[wg]);
        //     }
        // }
        // res.send(pageWidgets);

    }

    function findWidgetById(req,res){

        var widgetId=req.params["widgetId"];
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // for (var wg in widgets) {
        //     if (widgets[wg]._id === widgetId) {
        //         res.send(widgets[wg]);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to fetch widget data ="+widgetId);
        // return;

    }

    function updateWidget(req,res){

        var widgetId=req.params["widgetId"];
        var updatedWidget=req.body;
        // console.log("updatedWidget="+updatedWidget);
        model.widgetModel
            .updateWidget(widgetId,updatedWidget)
            .then(function (widget) {
                // console.log("widget="+widget);
                res.send(widget);
                return;
            },function (error) {
                // console.log("error="+error);
                res.status(404).send("Unable to update widget with id="+widgetId);
                return;
            });
        // for (var wg in widgets) {
        //     var widget = widgets[wg];
        //     if (widget._id === widgetId) {
        //
        //         var updatedWidget=req.body;
        //         widget.name=updatedWidget.name;
        //         widget.size = updatedWidget.size;
        //         widget.text = updatedWidget.text;
        //         widget.width = updatedWidget.width;
        //         widget.url = updatedWidget.url;
        //         widget.placeholder=updatedWidget.placeholder;
        //         widget.rows=updatedWidget.rows;
        //         widget.formatted=updatedWidget.formatted;
        //         res.send(widget);
        //         return;
        //
        //     }
        // }
        // res.status(404).send("Unable to update widget with id="+widgetId);
        // return;

    }

    function deleteWidget(req,res){

        var widgetId=req.params["widgetId"];
        model.widgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                res.sendStatus(200);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
        // for (var wg in widgets) {
        //     if (widgets[wg]._id === widgetId) {
        //         widgets.splice(wg, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to delete");
        // return;

    }
    
    function updateWidgetIndex(req,res) {
        var pageId=req.params["pageId"];
        var start=req.body.start+1;
        var stop=req.body.stop+1;
        // var pageWidgets = [];
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                console.log(widgets);
                if(start<stop){
                    for (var wg in widgets){
                        if(widgets[wg].gridLoc===start){
                            widgets[wg].gridLoc=stop;
                            widgets[wg].save();
                        }
                        else if(widgets[wg].gridLoc>start && widgets[wg].gridLoc<=stop){
                            widgets[wg].gridLoc-=1;
                            widgets[wg].save();
                        }
                    }
                }
                if(start>stop){
                    for (var wg in widgets){
                        if(widgets[wg].gridLoc===start){
                            // console.log("widgets[wg].gridLoc="+widgets[wg].gridLoc+" strrt="+start+" stop="+stop)
                            widgets[wg].gridLoc=stop;
                            widgets[wg].save();
                        }
                        else if(widgets[wg].gridLoc<start && widgets[wg].gridLoc>=stop){
                            widgets[wg].gridLoc+=1;
                            widgets[wg].save();
                        }
                    }
                }
                console.log(widgets);
            },function (error) {
                res.sendStatus(404);
                return;
            });

        // var count=0;
        // var start=req.body.start+1;
        // // console.log(start);
        // var stop=req.body.stop+1;
        // // console.log(stop);
        // if(start<stop){
        //     for (var wg in widgets){
        //         if(widgets[wg].gridLoc===start){
        //             widgets[wg].gridLoc=stop;
        //         }
        //         else if(widgets[wg].gridLoc>start && widgets[wg].gridLoc<=stop){
        //             widgets[wg].gridLoc-=1;
        //         }
        //     }
        // }
        // if(start>stop){
        //     for (var wg in widgets){
        //         if(widgets[wg].gridLoc===start){
        //             // console.log("widgets[wg].gridLoc="+widgets[wg].gridLoc+" strrt="+start+" stop="+stop)
        //             widgets[wg].gridLoc=stop;
        //         }
        //         else if(widgets[wg].gridLoc<start && widgets[wg].gridLoc>=stop){
        //             widgets[wg].gridLoc+=1;
        //         }
        //     }
        // }
        //
        // res.send(widgets);
        // return;

        ////////////////////////////////////////////////////
        // var startIndex=-1;
        // var stopIndex=-1;
        // for (var wg in widgets) {
        //     if (widgets[wg].pageId === pageId) {
        //         // pageWidgets.push(widgets[wg]);
        //         if(count===start){
        //             startIndex=wg;
        //         }
        //         if(count===stop){
        //             stopIndex=wg;
        //         }
        //         count++;
        //     }
        // }
        // // console.log(widgets);
        // var remove=widgets[startIndex];
        // widgets.splice(startIndex,1);
        // widgets.splice(stop,0,remove);
        // console.log(widgets);

    }
};