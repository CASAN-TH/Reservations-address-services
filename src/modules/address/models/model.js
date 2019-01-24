'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AddressSchema = new Schema({
    house_no: {
        type: String,
        required: 'Please fill a Address name',
    },
    village:{
        type:String
    },
    subdistrict:{
        type:String
    },
    district:{
        type:String
    },
    province:{
        type:String
    },
    postalcode:{
        type:String
    },
    shop_id:{
        type:String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Address", AddressSchema);