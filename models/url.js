const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true 
        },
    redirectURL: { 
        type: String,
        required: true 
        },
    
},{ timestamps: true });

module.exports = mongoose.model("URL", urlSchema);