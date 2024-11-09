const productServices = require('../services/productServices');

exports.getAllProduct = async(req,res,next)=>{
    try {

      
        const response = await productServices.getAllProducts(req.body);
        res.status(response.statusCode).send({productList:response.productList,message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err)
    }
}

exports.getAProduct = async(req,res,next)=>{
    try {

        req.body.productId = req.query.productId
        const response = await productServices.getAProduct(req.body);
        res.status(response.statusCode).send({product:response.product,message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err)
    }
}

exports.getAProductAttributes = async(req,res,next)=>{
    try {

        req.body.productId = req.query.productId
        const response = await productServices.getProductAttributes(req.body);
        res.status(response.statusCode).send({attributes:response.attributes,message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err)
    }
}


exports.getAProductVariantByAttributes = async(req,res,next)=>{
    try {

        const response = await productServices.getAProductVariantByAttributes(req.body);
        res.status(response.statusCode).send({product:response.product,message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err)
    }
}