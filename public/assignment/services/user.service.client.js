/**
 * Created by Rohit on 15-Feb-17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",function(){

            var users=[
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

            var api={
                "users":users,
                "findUserById":findUserById,
                "findUserByUsername":findUserByUsername,
                "findUserByCredential":findUserByCredential,
                "updateUser":updateUser,
                "addNewUser":addNewUser
            }

            function findUserByUsername(uname){
                for(u in users){
                    if(users[u].username===uname){
                        return users[u];
                    }
                }
                return null;
            }
            function addNewUser(newUser){
                newUser._id=(new Date()).getTime().toString();
                users.push(newUser);
                return newUser;
            }

            function updateUser(userId,newUser){
                for(var u in users){
                    var user=users[u];
                    if(user._id===userId){
                        user.firstName=newUser.firstName;
                        user.lastName=newUser.lastName;
                        return angular.copy(user);
                    }
                }
                return null;
            }

            function findUserById(userId){
                for(var u in users){
                    var user=users[u];
                    if(user._id===userId){
                        return angular.copy(user);
                    }
                }
                return null;
            }

            function findUserByCredential(username,password){
                for(var u in users){
                    var user=users[u];
                    if(user.username===username && user.password===password){
                        return angular.copy(user);
                    }
                }
                return null;
            }

            return api;
        });
})();