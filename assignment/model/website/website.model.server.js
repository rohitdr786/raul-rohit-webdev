/**
 * Created by Rohit on 22-Mar-17.
 */
module.exports=function () {
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    var q = require('q');
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteDataModel', WebsiteSchema);
    return api;

    function createWebsiteForUser(userId, website){
        var defer=q.defer();
        website._user=userId;
        WebsiteModel.create(website,function (err,data) {
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(data);
            }
        });
        return defer.promise;
    }
    function findAllWebsitesForUser(userId){
        var defer=q.defer();
        WebsiteModel.find({_user:userId},function (err,data) {
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(data);
            }
        });
        return defer.promise;
    }
    function findWebsiteById(websiteId){
        var defer=q.defer();
        WebsiteModel.findOne({_id:websiteId},function (err,data) {
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(data);
            }
        });
        return defer.promise;
    }
    function updateWebsite(websiteId, website){
        var defer=q.defer();
        WebsiteModel
            .update({_id:websiteId},{$set:website},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }
    function deleteWebsite(websiteId){
        var defer=q.defer();
        WebsiteModel
            .remove({_id:websiteId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(err);
                }
            });
        return defer.promise;
    }
};