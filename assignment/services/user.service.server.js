/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app){

    app.post("/api/user",createUser);
    app.get("/api/user",findUserByUsername);
    app.get("/api/user",findUserByCredentials);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req,res){
        var newUser=req.body;
        newUser._id=(new Date()).getTime().toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req,res){
        uname=req.query['username'];
        // for(u in users){
        //     if(users[u].username===uname){
        //         res.send(users[u]);
        //     }
        // }
        var user=users.find(function(u){
            return u.username==uname;
        });
        if(user){
            res.send(user);
        }else{
            res.status(404).send('User not found for username: '+uname);
        }
    }

    function findUserByCredentials(req,res){
        var username=req.query["username"];
        var password=req.query["password"];
        for(var u in users){
            var user=users[u];
            if(user.username===username && user.password===password){
                res.send(user);
                return;
            }
        }
        res.status(404).send('User not found with given credentials');
    }

    function findUserById(req,res){
        var userId=req.params['userId'];
        for(var u in users){
            var user=users[u];
            if(user._id===userId){
                res.send(user);
                return;
            }
        }
        res.status(404).send('User not found for user Id= '+userId);
    }

    function updateUser(req,res){
        var userId=req.params["userId"];
        for(var u in users){
            var user=users[u];
            if(user._id===userId){
                var newUser=req.body;
                user.firstName=newUser.firstName;
                user.lastName=newUser.lastName;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req,res){
        var userId=req.params["userId"];
        for(var u in users){
            if(users[u]._id===userId){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send('Unable to delete user ='+userId);
    }
};