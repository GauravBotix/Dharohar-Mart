import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadCategoryImageController = async(req, res) => {
  try {
      const file = req.file;
      console.log(file);
      const imageUploadCloudinary = await uploadImageCloudinary(file);
      
      return res.status(201).json({
          message: 'Successfully uploaded',
          data:imageUploadCloudinary,
          success: true,
          error: false,
      })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


export default uploadCategoryImageController;