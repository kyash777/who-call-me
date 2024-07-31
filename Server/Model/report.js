import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    messages: {
        type: [String],
        required:true
    },
    noReports:{
        type:Number
    }
})

const report = mongoose.model('report', ReportSchema);

export default report;