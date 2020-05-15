const express = require("express");
const app = express();
app.use(express.json())

const htmlToImage = require("html-to-image");

// asset arrays
const cdn_url = "https://cdn.glitch.com/bc207424-5299-4b33-b3c1-47699d6bf4a3%2Fpengmoji_"

const faces = []
const eyes = []
const noses = []
const reactions = []
const accessories = []

const filenames = {
  faces: ["head", "face", "brows", "cheeks"],
  eyes: [
    "angry", "calm", "dazzled", "happy", "kawaii", "laugh", "neutral", 
    "regular", "shock", "sparkle", "stars", "tired", "wink", "xd"
  ],
  noses: [
    "black", "fat_triangle", "half_circle", "round", "side_triangle", "triangle"
  ],
  reactions: [
    "awkward", "bangbang", "dark", "interrobang", "question_mark", "shock", "zzz"
  ],
  accessories: [
    "face_mask", "glasses", "graduate", "monocle", "muszka", "relax", "round_glasses", "scarf", "sunglasses"
  ]
}

for (const face of filenames.faces) {
  faces.push(cdn_url + face + ".png")
}

for (const eye of filenames.eyes) {
  eyes.push(cdn_url + "eyes_" + eye + ".png")
}

for (const nose of filenames.noses) {
  noses.push(cdn_url + "nose_" + nose + ".png")
}

for (const reaction of filenames.reactions) {
  reactions.push(cdn_url + reaction + ".png")
}

for (const accessory of filenames.accessories) {
  accessories.push(cdn_url + accessory + ".png")
}

// Routing
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/faces", (request, response) => {
  response.json(faces);
});

app.get("/eyes", (request, response) => {
  response.json(eyes);
});

app.get("/noses", (request, response) => {
  response.json(noses);
});

app.get("/reactions", (request, response) => {
  response.json(reactions);
});

app.get("/accessories", (request, response) => {
  response.json(accessories);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.post("/", (request, response) => {
  // TODO
  // generate a png image server-side
  console.log('post received');
  console.log(request.body);
  const css = `
  <style>.emoji-child,
.emoji-element,
#emoji {
  height: 200px;
  width: 200px;
  background-repeat: no-repeat;
  background-size: 200px 200px;
  background-color: transparent;  
}

#emoji {
  border: 3px solid grey;
  background: none;
  margin: 60px auto;
}

.emoji-child {
  position: absolute;
}

.emoji-element {
  display: inline-block;
  order: 1;
  cursor: pointer;
}</style>
  `
});