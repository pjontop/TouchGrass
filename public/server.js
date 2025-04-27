const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5500;

// Middleware for handling JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for photo uploads (for image files)
const upload = multer({ dest: 'assets/uploads/' }); // Save files to 'assets/uploads'

// Route for uploading photos (Base64 images) and captions
app.post('/upload-photo', (req, res) => {
    const { image } = req.body;

    // Convert base64 image back to binary
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(__dirname, 'uploads', 'photo.png');

    // Save the photo to disk
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving photo.' });
        }

        console.log('Photo uploaded:', filePath);
        res.json({ message: 'Photo uploaded successfully!' });
    });
});


// Route for uploading video (Blob)
app.post('/upload-video', upload.single('video'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No video uploaded.' });
    }

    // Move the uploaded video to a new location
    const newFilePath = path.join(__dirname, 'uploads', file.originalname);
    fs.rename(file.path, newFilePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving video.' });
        }
        res.json({ message: 'Video uploaded successfully!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
