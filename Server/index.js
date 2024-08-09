import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import Connection from './Database/db.js';
import Report from "./Model/report.js"
import dotenv from "dotenv"

dotenv.config()



const app = express();

app.use(cors())

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req,res)=>{
    return res.json("Hello")
})

app.post("/", async (req, res) => {

    try {
        const data = req.body;
        const API_KEY = "RwXUvpYwMHn2ZOv97ZeQkpVe5tQ7lggy";
        const URL = `https://www.ipqualityscore.com/api/json/phone/${API_KEY}/${data.phoneNumber}?country[]=${data.country}&country[]=UK&country[]=CA`;
        const apiResponse = await axios.get(URL)

        const phoneNumber = "+" + data.countryCode + data.phoneNumber

        const prevReport = await Report.findOne({ phoneNumber })

        if (prevReport) {
            const response = { carrier: apiResponse?.data?.carrier, fraud_score: prevReport.noReports, message: prevReport.messages, region: apiResponse?.data.region }
            return res.status(200).json(response)
        } else {
            return res.status(200).json(apiResponse.data)
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }


})

app.post("/report", async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const message = req.body.message;

        const report = await Report.findOne({ phoneNumber: phoneNumber });

        if (report) {
            report.messages.push(message);
            report.noReports += 1;
            await report.save();
            return res.status(200).json("Phone Number Reported Successfully")
        } else {
            const newReport = new Report({
                phoneNumber,
                messages: [message],
                noReports: 1
            })
            await newReport.save();
            return res.status(200).json("Phone Number Reported Successfully")
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
})


Connection("mongodb+srv://ankit:ankit2001@cluster0.bjyab.mongodb.net/phoneDB")

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));