const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const {uploadImageToCloudinary}=require("../Utils/imageUpload");
exports.createSubSection = async (req, res) => {
    try {
        //fecth data from Req body
        const { sectionId, title, timeDuration, description } = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            { new: true }).populate("subSection").exec();
            return res.status(200).json({
                succcess:true,
                message:'Sub Section Created Successfully',
                updatedSection,
            });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
//update subSection
exports.updatesubSection = async (req, res) => {
    try {
        //data input
        const { subSectionName, subSectionId } = req.body;
        //data validation
        if (!subSectionName || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            });
        }
        //update data
        const subSection = await SubSection.findByIdAndUpdate({ subSectionId }, { subSectionName }, { new: true });
        //return res
        return res.status(200).json({
            success: true,
            message: 'SubSection Updated Successfully',
            subSection
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update subSection, please try again",
            error: error.message,
        });
    }
}
//HW:deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
        //get ID - assuming that we are sending ID in params
        const { subSectionId } = req.params
         //use findByIdandDelete
         await SubSection.findByIdAndDelete(subSectionId);
         //TODO[Testing]: do we need to delete the entry from the course schema ??
         //return response
         return res.status(200).json({
             success:true,
             message:"SubSection Deleted Successfully",
         })
 

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete subSection, please try again",
            error:error.message,
        });
    }
}