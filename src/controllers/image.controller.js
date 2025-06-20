const {addImageModel, deleteImgeModel, getImagesByProductModel, getImagesByIdModel } = require('../models/image.model');


const addImageController = async (req, res) => {
    try {
        const { product_id } = req.body;
        
        if (!product_id) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

       
        let images = [];
        if (req.file) {
            images = [req.file.filename];
        } else if (req.files) { 
            images = req.files.map(file => file.filename);
        }

     
        if (images.length === 0) {
            return res.status(400).json({
                message: "At least one image is required"
            });
        }

        const newImage = await addImageModel(images, product_id);
        
        return res.status(201).json({
            success: true,
            message: "Image(s) added successfully",
            data: newImage  
        });
        
    } catch (error) {
        console.error("Error adding image:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while adding image",
            // error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteImgeController = async (req, res) => {
    try {
        const image_id  = req.params.image_id;
        if (!image_id) return res.json('Undefined variable');
        const existingImage = await getImagesByIdModel(image_id);
        if (!existingImage) return res.status(404).json('Not Found Image');
        const deletedImage = await deleteImgeModel(image_id);
        return res.status(200).json({
            message: "Image deleted successfuly",
            data: deletedImage
        })
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error deleting image",
                error: error
            }
        )
    }
}

const getImagesByProductController = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const images = await getImagesByProductModel(product_id);
        return res.status(200).json({
            message: "Images retrieved successfuly",
            data: images
        })
    } catch (error) {
        return res.status(500).json(
            {
                message: "Error retrieving image",
                error: error
            }
        )
    }
}

module.exports = {
    addImageController,
    deleteImgeController,
    getImagesByProductController
}