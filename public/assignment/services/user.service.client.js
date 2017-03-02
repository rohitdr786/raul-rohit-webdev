/**
 * Created by Rohit on 15-Feb-17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",function($http){

            var api={
                "findUserById":findUserById,
                "findUserByUsername":findUserByUsername,
                "findUserByCredential":findUserByCredential,
                "updateUser":updateUser,
                "addNewUser":addNewUser,
                "deleteUser":deleteUser
            }

            function findUserByUsername(uname){
                return $http.get("/api/user?username="+uname);
            }
            function addNewUser(newUser){
                return $http.post("/api/user",newUser);
            }
            function deleteUser(userId){
                return $http.delete("/api/user/"+userId);
            }

            function updateUser(userId,newUser){
                return $http.put("/api/user/"+userId,newUser);
            }

            function findUserById(userId){
                return $http.get("/api/user/"+userId);
            }

            function findUserByCredential(username,password){
                return $http.get("/api/user?username="+username+"&password="+password);
            }

            return api;
        });
})();