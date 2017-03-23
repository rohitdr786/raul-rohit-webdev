module.exports=function () {
    var api={
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser
    };
    var q = require('q');
    var mongoose=require('mongoose');
    var UserSchema=require('./user.schema.server')();
    var UserModel=mongoose.model('UserDataModel',UserSchema);
    return api;

    function createUser(user){
        // console.log(user);
        var d=q.defer();
        UserModel.create(user,function (err,data) {
            if(err){
                d.reject(err);
            }else{
                d.resolve(data);
            }
        });
        return d.promise;
    }

    function findUserById(userId){
        // console.log("findUserById="+userId);
        var d=q.defer();
        UserModel
            .findOne({_id:userId},function (err,data) {
                if(err){
                    d.reject(err);
                }else{
                    d.resolve(data);
                }
            });
        return d.promise;
    }

    function findUserByUsername(username){
        var d=q.defer();
        UserModel
            .find({username:username},function (err,data) {
                if(err){
                    d.reject(err);
                }else{
                    d.resolve(data);
                }
            });
        return d.promise;
    }

    function findUserByCredentials(username, password){
        var d=q.defer();
        UserModel
            .find({username:username,password:password},function (err,data) {
                if(err){
                    d.reject(err);
                }else{
                    d.resolve(data);
                }
            });
        return d.promise;
    }

    function updateUser(userId, user){
        // console.log("userId="+userId+" user="+user);
        var d=q.defer();
        UserModel
            .update({_id:userId},{$set:user},function (err,data) {
                if(err){
                    d.reject(err);
                }else{
                    d.resolve(data);
                }
            });
        return d.promise;
    }

    function deleteUser(userId){
        var d=q.defer();
        UserModel
            .remove({_id:userId},function (err,data) {
                if(err){
                    d.reject(err);
                }else{
                    d.resolve(data);
                }
            });
        return d.promise;
    }
};