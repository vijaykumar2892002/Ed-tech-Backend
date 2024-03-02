const category = require("../Models/category");
//create Tag ka handler funciton
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body; //fetch data
        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }
        const categoryDetails = await category.create({ name: name, description: description });
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//getAlltags handler function
exports.showAlltags = async (req, res) => {
    try {
        const allcategory = await category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}