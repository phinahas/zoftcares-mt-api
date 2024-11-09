const Category = require('../models/Category');
const Product = require('../models/Product');
const Attribute = require('../models/Attribute');

const utils = require('../utils/commonFns')

exports.createNewCategory = async({CategoryName})=>{
    try {

        if(CategoryName.length<0 || !CategoryName ) return {statusCode:409,message:"Something error with your input"}

        let cleanedName = utils.cleanUpString(CategoryName);

        const categoryFromDb = await Category.findOne({name:cleanedName});
        if(categoryFromDb) return {statusCode:409,message:"Category already exists."}

        const categoryObj = new Category({
            name:cleanedName
        })
        
        await categoryObj.save();
        return {statusCode:201,message:"New Category created."}

    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.createNewAttribute = async({attributeName,attributeValues})=>{
    try {

        if(attributeName.length<0 || !attributeName ) return {statusCode:409,message:"Something error with your input"}

        let cleanedName = utils.cleanUpString(attributeName);

        const attributeFromDb = await Attribute.findOne({name:cleanedName});
        if(attributeFromDb) return {statusCode:409,message:"Attribute already exists."}

        const attributeObj = new Attribute({
            name:cleanedName,
            values:attributeValues
        })

        await attributeObj.save();
        return {statusCode:201,message:"New Attribute created."}


        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.listCategory = async({})=>{
    try {

        const categoryListFromDb = await Category.find({});
        if(categoryListFromDb.length == 0) return{statusCode:204,message:"Empty list"}
        return{statusCode:200,categoryList:categoryListFromDb}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.listAttributes = async({})=>{
    try {

        const attributeListFromDb = await Attribute.find({});
        if(attributeListFromDb.length == 0) return{statusCode:204,message:"Empty list"}
        return{statusCode:200,attributeList:attributeListFromDb}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createANewVariantProduct = async({
    name,category,description,variants
})=>{

    try {

        if(name.length<0 || !name ) return {statusCode:409,message:"Something error with your input"}

        let cleanedName = utils.cleanUpString(name);

        const productFromDb = await Product.findOne({name:cleanedName});
        if(productFromDb) return {statusCode:409,message:"Product already exists."}

        const porductObj = new Product({
            name:cleanedName,
            isVariant:true,
            category:category,
            description:description,
            variants:variants
        })

        await porductObj.save();

        return {statusCode:200,message:"Product created."}


        
    } catch (error) {
        console.log(error);
        throw error;
    }

}