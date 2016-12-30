var express = require('express')
  , router = express.Router()
var multer = require('multer')
var autoReap  = require('multer-autoreap');
var cv = require('opencv')
var storage = multer.diskStorage({
  destination: __dirname + '/upload/',
  filename: function(req,file,cb){
    cb(null,"auth-face" + Date.now() + ".png")
  }
});
var upload = multer({storage: storage});
//
// router.get('/', function(req, res) {
// 	res.json({'users':'ALL'});
// })

// router.get('/:id', function(req, res) {
// 	res.json({'user_id':req.params.id});
// // });
// for(var i = 1;i<9;i++)
// {
//   cv.readImage("/Users/Rahul/Desktop/train/" + i + ".jpg",function(err,im){
//     im.convertGrayscale();
//     im.save("/Users/Rahul/Desktop/train/g" + i + ".pgm");
//   })
//
//
// }

router.post('/upload', upload.single('auth-face'), function(req, res) {
  console.log(String(req))
 var faces;
 var trainData = [];

 for(var i = 1;i<9;i++)
 {
   cv.readImage(__dirname + '/../train/' + i + ".jpg",function(err,im){
     //im.convertGrayscale();
     //im.save("/Users/Rahul/Desktop/train/g" + i + ".pgm");
     im.cvtColor("CV_BGR2GRAY");



     trainData.push(new Array(1,im));
   })

 }

  cv.readImage(__dirname + "/upload/" + req.file.filename, function(err, im){
  // im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
  //   for (var i=0;i<faces.length; i++){
  //     var x = faces[i]
  //
  //     im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
  //   }
    var facerec = cv.FaceRecognizer.createLBPHFaceRecognizer();
    facerec.trainSync(trainData);

    //im.save('/Users/Rahul/Google Drive/Personal_Projects/node_face_middle_server/controllers/results/test.png');
    im.cvtColor("CV_BGR2GRAY");

    res.json({request:{image: req.file.filename,result:facerec.predictSync(im)}})


})



})

module.exports = router;
