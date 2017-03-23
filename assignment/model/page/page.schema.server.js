/**
 * Created by Rohit on 22-Mar-17.
 */
module.exports=function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteDataModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetDataModel'}],
        dateCreated: Date
    }, {collection: 'webappmaker.page'});

    return PageSchema;
};