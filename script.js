const cdn_url = "images/pengmoji_"

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
  filename = cdn_url + face + ".png";
  appendNewImage(filename, "faces");
}

for (const eye of filenames.eyes) {
  filename = cdn_url + "eyes_" + eye + ".png";
  appendNewImage(filename, "eyes");
}

for (const nose of filenames.noses) {
  filename = cdn_url + "nose_" + nose + ".png";
  appendNewImage(filename, "noses");
}

for (const reaction of filenames.reactions) {
  filename = cdn_url + reaction + ".png";
  appendNewImage(filename, "reactions");
}

for (const accessory of filenames.accessories) {
  filename = cdn_url + accessory + ".png";
  appendNewImage(filename, "accessories");
}

// append an asset -> use checkboxes to preserve current state
function appendNewImage(e, p) {
  const id = e.match(/(pengmoji_)(.+)(\.png)/)[2]
  const newCheckbox = document.createElement("input");
  const parent = document.getElementById(p);
  
  newCheckbox.type = "checkbox";
  newCheckbox.id = id;
  newCheckbox.name = "pengmoji_" + id;
  parent.appendChild(newCheckbox);
  
  newCheckbox.addEventListener('change', function() {
    const emojiBox = document.getElementById('emoji');
    if (this.checked) {
      const element = document.createElement("img");
      element.id = "emoji" + id;
      element.className += "emoji-child";
      // element.setAttribute("crossOrigin", "Anonymous");
      //element.style.backgroundImage = 'url(' + e + ')';
      element.src = e;
      // element.setAttribute("crossOrigin", "Anonymous");
      emojiBox.appendChild(element);
    } else {
      emojiBox.removeChild(document.getElementById("emoji" + id))
    }
  });
  
  const newLabel = document.createElement("label");
  newLabel.className += "emoji-element";
  newLabel.style.backgroundImage = 'url(' + e + ')';
  newLabel.setAttribute("for", id);
  parent.appendChild(newLabel);
}

// Generate the image from div
// Currently using html2canvas
// This is a form in case I ever want to add a better back-end way of rendering.
// It has the state of checkboxes in Object.fromEntries(new FormData(e.target).entries()).
document.getElementById("emoji_form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const html_to_generate = document.getElementById("emoji")

  const canvas = document.getElementById('viewport'),
  context = canvas.getContext('2d');
  // context.drawImage(document.getElementById('kitten-png'), 0, 0);
  const children = Array.from(html_to_generate.childNodes);

  for (const child of children) {
    context.drawImage(child, 0, 0);
  }

  const uri = canvas.toDataURL();
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri; 
    link.download = "pengmoji.png";
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
   } else {
     window.open(uri);
   };
})
