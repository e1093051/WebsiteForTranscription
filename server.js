/** 
const express = require('express');
const multer = require('multer');
const path = require('path');
const { upload_transcribeAudio } = require('./speechToText'); // Import the transcribe function

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './webpage.html')); // Adjust the filename if necessary
});

app.post('/upload', upload.single('audioFile'), async (req, res) => {
    console.log("uploading")
    const transcription = await upload_transcribeAudio(req.file.originalname); // Use the original name for transcription
    res.send(transcription);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
*/
const express = require('express');
const multer = require('multer');
const path = require('path');
const { upload_transcribeAudio } = require('./speechToText'); // Import the transcribe function

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './firstPage.html')); // Adjust the filename if necessary
});

app.post('/upload', upload.single('audioFile'), async (req, res) => {
    console.log("uploading")
    const transcription = await upload_transcribeAudio(req.file.originalname); // Use the original name for transcription
    res.send(transcription);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
app.get('/nextpage', (req, res) => {
    res.sendFile(__dirname + '/webpage.html');
});