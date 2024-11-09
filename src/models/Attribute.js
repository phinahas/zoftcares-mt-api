const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    values: [{
        type: Schema.Types.String, 
        required: true,
    }],


});

module.exports = mongoose.model("Attribute", attributeSchema);


