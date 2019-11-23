const functions = require('firebase-functions');
const express = require('express');
const path = require('path')
const { get } = require('request');
const app = express();
const faceapi = require('face-api.js');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../images')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, './models')))
app.use(express.static(path.join(__dirname, '../../dist')))

const viewsDir = path.join(__dirname, 'views')
console.log(viewsDir)

app.get('/', (req, res) => res.redirect('/webcam_face_expression_recognition'))
app.get('/face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceDetection.html')))
app.get('/face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceLandmarkDetection.html')))
app.get('/face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceExpressionRecognition.html')))
app.get('/age_and_gender_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'ageAndGenderRecognition.html')))
app.get('/face_extraction', (req, res) => res.sendFile(path.join(viewsDir, 'faceExtraction.html')))
app.get('/face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'faceRecognition.html')))
app.get('/video_face_tracking', (req, res) => res.sendFile(path.join(viewsDir, 'videoFaceTracking.html')))
app.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')))
app.get('/webcam_face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceLandmarkDetection.html')))
app.get('/webcam_face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceExpressionRecognition.html')))
app.get('/webcam_age_and_gender_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'webcamAgeAndGenderRecognition.html')))
app.get('/bbt_face_landmark_detection', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceLandmarkDetection.html')))
app.get('/bbt_face_similarity', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceSimilarity.html')))
app.get('/bbt_face_matching', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceMatching.html')))
app.get('/bbt_face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'bbtFaceRecognition.html')))
app.get('/batch_face_landmarks', (req, res) => res.sendFile(path.join(viewsDir, 'batchFaceLandmarks.html')))
app.get('/batch_face_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'batchFaceRecognition.html')))

// app.get('/webcam_face_expression_recognition', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceExpressionRecognition.html')));
// app.get('/realtime', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceExpressionRecognition.html')));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

console.log(faceapi.nets)

exports.app = functions.https.onRequest(app);


function request(url, returnBuffer = true, timeout = 10000) {
    return new Promise(function(resolve, reject) {
      const options = Object.assign(
        {},
        {
          url,
          isBuffer: true,
          timeout,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
          }
        },
        returnBuffer ? { encoding: null } : {}
      )
  
      get(options, function(err, res) {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }