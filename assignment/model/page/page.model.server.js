/**
 * Created by Rohit on 22-Mar-17.
 */
module.exports=function () {
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    var q = require('q');
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageDataModel', PageSchema);
    return api;

    function createPage(websiteId, page){
        var defer=q.defer();
        page._website=websiteId;
        PageModel
            .create(page,function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }
    function findAllPagesForWebsite(websiteId){
        var defer=q.defer();
        PageModel
            .find({_website:websiteId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }
    function findPageById(pageId){
        var defer=q.defer();
        PageModel
            .findOne({_id:pageId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }
    function updatePage(pageId, page){
        var defer=q.defer();
        PageModel
            .update({_id:pageId},{$set:page},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }
    function deletePage(pageId){
        var defer=q.defer();
        PageModel
            .remove({_id:pageId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }


};