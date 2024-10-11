// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');

// Creates a client from a Google service account key
const storage = new Storage({keyFilename: 'pop-1-435802-7bcc637a257e.json'});

// The ID of your GCS bucket
const bucketName = 'database_pop-1';

async function uploadFile(filename) {
    await storage.bucket(bucketName).upload(filename, {
        destination: filename,
    });
    console.log(`${filename} uploaded to ${bucketName}.`);
}

const client = new speech.SpeechClient({ keyFilename: 'pop-1-435802-7bcc637a257e.json' });

async function transcribeAudio(filename) {
    const request = {
        config: {
            encoding: "MP3", // Make sure this matches the actual file encoding
            sampleRateHertz: 16000,
            languageCode: "en-US",
            enableWordTimeOffsets: false,
        },
        audio: {
            uri: `gs://${bucketName}/${filename.split('/').pop()}`, // Use backticks for template literal
        },
    };

    try {
        // Perform the transcription
        const [operation] = await client.longRunningRecognize(request);

        // Wait for the operation to complete
        const [response] = await operation.promise();

        // Extract the transcription
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');

        // Print the transcription to the console
        console.log('Transcription:', transcription);
        return transcription;
    } catch (error) {
        console.error('Error during transcription:', error);
    }
}

async function upload_transcribeAudio(filename) {
    await uploadFile(filename);
    return await transcribeAudio(filename);
}


//upload_transcribe('/Users/yuehchingfan/Desktop/Website/Power_English_Update.mp3');

module.exports = { upload_transcribeAudio };