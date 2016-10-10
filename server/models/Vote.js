/**
 * Created by Utkarsh on 9/11/16.
 */
var mongoose = require('mongoose');

// Create the VoteSchema.
var VoteSchema = new mongoose.Schema({
    gender: {
        type: [{
            type: String,
            enum: ['boy', 'girl']
        }],
        required: true
    },
    babyName: [{
        type: String,
        trim: true
    }],
    month: {
        type: String,
        required: true,
        default: 'January'
    },
    day: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: String,
        trim: true,
        required: true

    }
    // ,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    //     //, required: 'invalid category' // TODO: make tests pass valid category
    // }

});

// Export the vote schema.
module.exports = VoteSchema;