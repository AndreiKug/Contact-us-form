import express from "express";
import mongoose from "mongoose";
import path from 'path';
import { validationResult } from "express-validator";
import 'dotenv/config';
// import multer from "multer"; 
// import { fileURLToPath } from 'url';

import { formValidator } from "./validations/formValidation.js";
import FormModel from "./models/Form.js";

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.json());

const __dirname = path.resolve();
app.use('/styles', express.static(path.join(__dirname, 'styles')));



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", urlencodedParser, formValidator, async (req, res) => { 
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const doc = FormModel({
        name: req.body.name,
        email: req.body.email,
        tag: req.body.tag,
        question: req.body.question,
        uploadFile: req.body.uploadFile
    });

    const ticket = await doc.save();

    // res.json({
    //     message: 'Форма отправлена'
    // });
    res.sendFile(__dirname + "/index.html");

    // res.send(`${req.body.name} - ${req.body.email}`);
    console.log('post из App.js')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать обращение'            
        });
    }
});
   
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Server OK");
});

