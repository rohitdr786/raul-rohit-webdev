/**
 * Created by Rohit on 22-Mar-17.
 */
module.exports=function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageDataModel'},
        type: String, enum: ['HTML','IMAGE','YOUTUBE','HEADER','TEXT'],
        name: String,
        text: String,
        placeholder:String,
        description: String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class: String,
        icon: String,
        deletable:Boolean,
        formatted: Boolean,
        gridLoc:Number,
        dateCreated: Date
    }, {collection: 'webappmaker.widget'});

    return WidgetSchema;
};