const adminServices = require('../services/adminServices');

exports.createCategory = async(req,res,next)=>{
    try {

        const response = await adminServices.createNewCategory(req.body);
        res.status(response.statusCode).send({message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.createAttribute = async(req,res,next)=>{
    try {

        const response = await adminServices.createNewAttribute(req.body);
        res.status(response.statusCode).send({message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.createVariantProduct = async(req,res,next)=>{
    try {

        const response = await adminServices.createANewVariantProduct(req.body);
        res.status(response.statusCode).send({message:response.message})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.listCategory = async(req,res,next)=>{
    try {

        const response = await adminServices.listCategory(req.body);
        res.status(response.statusCode).send({message:response.message,categoryList:response.categoryList})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}

exports.listAttribute = async(req,res,next)=>{
    try {

        const response = await adminServices.listAttributes(req.body);
        res.status(response.statusCode).send({message:response.message,attributeList:response.attributeList})
        
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
}


exports.createVariantProduct = async(req,res,next)=>{
    try {

        const response = await adminServices.createANewVariantProduct(req.body);
        res.status(response.statusCode).send({message:response.message})
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}