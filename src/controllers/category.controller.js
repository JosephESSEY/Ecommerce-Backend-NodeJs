const {createCategorie, updateCategorie, deleteCategorie, ListeCategorie, getCategorieById} = require('../models/category.model')


exports.create = async(req, res)=>{
    try {
        const {name, description} = req.body;
        const newCategorie = await createCategorie(name, description);
        return res.status(201).json({
            "message" : "Category created successfully",
            "resultat" : newCategorie
        })
    } catch (error) {
        return res.status(500).json({
            "message" : "Error creating category",
            "error" : error
        })
    }
}

exports.update = async(req, res) => {
    try{
        const {id, name, description} = req.body;
        const existingCategory = await getCategorieById(id);
        if(!existingCategory) return res.status(404).json('Category Not Found');

        const updatedCategorie = await updateCategorie(id, name, description);
        return res.status(200).json({
            "message" : "Category updated successfully",
            "resultat" : updatedCategorie
        });
    }catch(error){
        return res.status(500).json({
            "message" : "Error updating category",
            "error" : error
        });
    }
}

exports.deleteC = async(req, res) =>{
    try{
        const {id} = req.body;
        const existingCategory = await getCategorieById(id);
        if(!existingCategory) return res.status(404).json('Category Not Found');

        const deletedCategorie = await deleteCategorie(id);
        return res.status(200).json({
            "message" : "Category deleted successfully",
            "resultat" : deletedCategorie
            });
    }catch(error){
        return res.status(500).json({
            "message" : "Error deleting category",
            "error" : error
        });
    }
}

exports.all = async(req, res) => {
    try {
        const categories = await ListeCategorie();
        return res.status(200).json({
            "message" : "Categories retrieved successfully",
            "resultat" : categories
    })
    } catch (error) {
        return res.status(500).json({
            "message" : "Error retrieving categories",
            "error" : error
        });
    }
}

exports.OneCategory = async(req, res) => {
    try {
        const id = req.params.id;

        const categorie = await getCategorieById(id);

        if(!categorie) return res.status(404).json('Category Not Found');
        
        return res.status(200).json({
            "message" : "Category retrieved successfully",
            "resultat" : categorie
        })
    } catch (error) {
        return res.status(500).json({
            "message" : "Error retrieving category",
            "error" : error
        });
    }
}