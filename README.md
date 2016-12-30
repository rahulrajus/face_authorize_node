Face Recognition with Node.JS


Usage:
install dependencies using:
```
 npm install
```
Place training images in the train folder. Format is #.jpg (Ex. 1.jpg,2.jpg,3.jpg,etc.). As of now, you can only train on one face.
Start server:
```
 node app.js
``` 
POST image with key "auth-face" to http://127.0.0.1:/users/upload/
Response format-
``` 
{
  "request": {
    "image": "auth-face1483062621510.png",
    "result": {
      "id": 1,
      "confidence": 28.46704508044364
    }
  }
}
```
If id is 1, face was identified. If face not found, id will be set to -1
