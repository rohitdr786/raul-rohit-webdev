module.exports=function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserDataModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageDataModel'}],
        dateCreated: Date
    }, {collection: 'webappmaker.website'});

    return WebsiteSchema;
};