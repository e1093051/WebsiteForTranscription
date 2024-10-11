// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html


// Creates a client from a Google service account key
const storage = new Storage({keyFilename: 'pop-1-435802-7bcc637a257e.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'database_pop-1';

async function uploadFile(filename) {
    await storage.bucket(bucketName).upload(filename, {
      destination: filename,
    });
  
    console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile('Power_English_Update.mp3').catch(console.error);

