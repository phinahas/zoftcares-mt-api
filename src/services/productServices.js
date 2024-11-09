const ObjectId = require("mongoose").Types.ObjectId;
const Product = require('../models/Product');

exports.getAllProducts = async({})=>{
    try {

        const productsFromDb = await Product.find({},{_id:1,isVariant:1,name:1, description:1});
        if(productsFromDb.length == 0) return {statusCode:204,message:"Empty list"}
        return {statusCode:200,productList:productsFromDb}

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getAProduct = async({productId})=>{
    try {

        const productFromDb = await Product.findById(productId)
        .populate({
            path: 'variants.attributes.attribute',  
            model: 'Attribute',                      
            select: 'name values _id'                   
        });

    if (!productFromDb) {
        return { message: "Product not found", statusCode:409 };
    }

    // to get a variant with stock>0
    const inStockVariant = productFromDb.variants.find(variant => variant.stock > 0);

    if (!inStockVariant) {
        return { statusCode:409, message: "No variants in stock for this product" };
    }

    // formatting data
    let formattedProduct = {
        _id: productFromDb._id,
        name: productFromDb.name,
        category: productFromDb.category,
        brand: productFromDb.brand,
        variant: {
            price: inStockVariant.price,
            stock: inStockVariant.stock,
            sku: inStockVariant.sku,
            imageLink: inStockVariant.imageLink,
            attributes: inStockVariant.attributes.map(attr => ({
                _id:attr.attribute._id,
                attributeName: attr.attribute.name, 
                value: attr.value                 
            }))
        }
    };


            return {statusCode:200,product:formattedProduct}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getProductAttributes = async({productId})=> {
    try {
        const attributes = await Product.aggregate([
            { $match: { _id: new ObjectId(productId) } },
            { $unwind: "$variants" }, 
            { $unwind: "$variants.attributes" }, 
            {
                $lookup: {
                    from: "attributes", 
                    localField: "variants.attributes.attribute",
                    foreignField: "_id",
                    as: "attributeDetails"
                }
            },
            { $unwind: "$attributeDetails" }, 
            {
                $group: {
                    _id: { id: "$attributeDetails._id", name: "$attributeDetails.name" }, 
                    values: { $addToSet: "$variants.attributes.value" } 
                }
            },
            {
                $project: {
                    _id: 0,
                    attributeId: "$_id.id",
                    attribute: "$_id.name",
                    values: 1
                }
            }
        ]);
        
        return { statusCode: 200, attributes: attributes };
        

    } catch (error) {
        console.log(error)
       const err = new Error("Error fetching product attributes:"+error) 
        throw err;
    }
}

exports.getAProductVariantByAttributes = async({productId,attributeArray})=>{
    try {

        
        const productFromDb = await Product.findById(productId).populate({
            path: 'variants.attributes.attribute',  
            model: 'Attribute',                     
            select: 'name values'                    
        });

        if (!productFromDb) {
            return { statusCode:409, message: "Product not found" };
        }

        // finding matching variant
        let matchingVariant = productFromDb.variants.find(variant => {
            return attributeArray.every(attr => {
                const matchingAttr = variant.attributes.find(attribute => {
                    return String(attribute.attribute._id) === String(attr.attribute) && attribute.value === attr.attributeValue;
                });
                return matchingAttr;  
            });
        });

        // if no matching varnts, get varnts with stock > 0 
        if (!matchingVariant) {
            matchingVariant = productFromDb.variants.find(variant => variant.stock > 0);
        }

        
        if (!matchingVariant) {
            return { statusCode:409,message: "No variant found with available stock" };
        }

        
        let filteredProduct = {
            _id: productFromDb._id,
            name: productFromDb.name,
            category: productFromDb.category,
            brand: productFromDb.brand,
            variant: {
                price: matchingVariant.price,
                stock: matchingVariant.stock,
                sku: matchingVariant.sku,
                imageLink: matchingVariant.imageLink,
                attributes: matchingVariant.attributes.map(attr => ({
                    _id: attr.attribute._id,          
                    attributeName: attr.attribute.name,
                    value: attr.value
                }))
            }
        };
        
        return { statusCode: 200, product: filteredProduct };
        
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}