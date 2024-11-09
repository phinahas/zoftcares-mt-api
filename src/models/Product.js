const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    isVariant:{
        type:Schema.Types.Boolean,
        default:false
    },
    
    description: {
        type: Schema.Types.String,
    },
    variants: [
        {
            attributes: [
                {
                    attribute: {
                        type: Schema.Types.ObjectId,
                        ref: "Attribute",
                        required: true,
                    },
                    value: {
                        type: Schema.Types.String,
                        required: true,
                    },
                }
            ],
            price: {
                type: Schema.Types.Number,
                required: true,
            },
            stock: {
                type: Schema.Types.Number,
                default: 0,
            },
            sku: {
                type: Schema.Types.String,
                required: true,
            },
            imageLink:{
                type: Schema.Types.String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    
});



module.exports = mongoose.model("Product", productSchema);
