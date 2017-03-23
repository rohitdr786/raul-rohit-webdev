/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app,model){

    app.post("/api/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    // var users=[
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];


    function findUser(req,res){
        var pass=req.query["password"];
        if(pass==null||pass==""||pass==undefined){
            findUserByUsername(req,res);
        }else{
            findUserByCredentials(req,res);
        }
    }

    function createUser(req,res){
        var newUser=req.body;
        model.userModel
            .createUser(newUser)
            .then(function (userData) {
                // console.log("in service= "+ userData);
                res.json(userData);
            },function (error) {
                // console.log(error);
                res.sendStatus(404);
            });
        // newUser._id=(new Date()).getTime().toString();
        // users.push(newUser);
        // res.json(newUser);
    }

    function findUserByUsername(req,res){
        // console.log("findUserByUsername");
        uname=req.query['username'];
        // for(u in users){
        //     if(users[u].username===uname){
        //         res.send(users[u]);
        //     }
        // }
        model.userModel
            .findUserByUsername(uname)
            .then(function (userData) {
                // console.log("userData="+userData);
                if(userData.length===0){
                    res.status(404).send('User not found for username: '+uname);
                }else{
                    res.send(userData[0]);
                }
            },function (error) {
                // console.log("error="+error);
                res.status(404).send('User not found for username: '+uname);
            });
        // var user=users.find(function(u){
        //     return u.username==uname;
        // });
        // if(user){
        //     res.send(user);
        // }else{
        //     res.status(404).send('User not found for username: '+uname);
        // }
    }

    function findUserByCredentials(req,res){
        // console.log("findUserByCredentials");
        var username=req.query["username"];
        var password=req.query["password"];
        model.userModel
            .findUserByCredentials(username,password)
            .then(function (userData) {
                // console.log("findUserByCredentials:userData"+userData);
                if(userData.length===0){
                    res.status(404).send('User not found with given credentials');
                }else{
                    res.send(userData[0]);
                }
            },function (error) {
                // console.log("findUserByCredentials:error"+error);
                res.status(404).send('User not found with given credentials');
            });
        // for(var u in users){
        //     var user=users[u];
        //     if(user.username===username && user.password===password){
        //         res.send(user);
        //         return;
        //     }
        // }
        // res.status(404).send('User not found with given credentials');
    }

    function findUserById(req,res){
        var userId=req.params['userId'];
        // console.log("userId="+userId);
        model.userModel
            .findUserById(userId)
            .then(function (data) {
                // console.log("data"+data);
                res.send(data);
            },function (error) {
                // console.log("error"+error);
                res.status(404).send('User not found for user Id= '+userId);
            });
        // for(var u in users){
        //     var user=users[u];
        //     if(user._id===userId){
        //         res.send(user);
        //         return;
        //     }
        // }
        // res.status(404).send('User not found for user Id= '+userId);
    }

    function updateUser(req,res){
        var userId=req.params["userId"];
        // console.log("userId="+userId);
        model.userModel
            .findUserById(userId)
            .then(function (data) {
                // console.log("data"+data);
                var newUser=req.body;
                model.userModel
                    .updateUser(userId,newUser)
                    .then(function (userData) {
                        // console.log("updateUser="+userData);
                        res.sendStatus(200);
                        return;
                    },function (error) {
                        res.sendStatus(404);
                    });
            },function (error) {
                // console.log("error"+error);
                res.status(404).send('User not found for user Id= '+userId);
            });

        // for(var u in users){
        //     var user=users[u];
        //     if(user._id===userId){
        //
        //         user.firstName=newUser.firstName;
        //         user.lastName=newUser.lastName;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deleteUser(req,res){
        var userId=req.params["userId"];
        model.userModel
            .deleteUser(userId)
            .then(function (userData) {
                res.sendStatus(200);
                return;
            },function (error) {
                res.status(404).send('Unable to delete user ='+userId);
            });
        // for(var u in users){
        //     if(users[u]._id===userId){
        //         users.splice(u,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send('Unable to delete user ='+userId);
    }
};