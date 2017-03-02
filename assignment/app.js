/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app){

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
    // app.get("/test/123",function(req,res){
    //     res.send([{message:"Hello from Rohit",abc:123,asd:1546},{asd:465}]);
    // });
};