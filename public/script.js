// import html2canvas from 'html2canvas';
// const domToImage = require('domtoimage');

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
      const element = document.createElement("div");
      element.id = "emoji" + id;
      element.className += "emoji-child";
      element.style.backgroundImage = 'url(' + e + ')';
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

// fetch assets
const assets = ["faces", "eyes", "noses", "reactions", "accessories"]

for (const asset of assets) {
  fetch(asset).then(response => response.json()).then(items => {
    for (const item of items) {
      appendNewImage(item, asset)
    }
  })
}

// TODO
// 1. Add a "Generate" button
// 2. Pass currently checked checkboxes to the backend
// 3. Generate pengmoji from assets (or maybe just the div?)
// 4. Download pengmoji
document.getElementById("emoji_form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  console.log('submitting form')
  // const entries = Object.fromEntries(new FormData(e.target).entries());
  // console.log(entries);
  const html_to_generate = document.getElementById("emoji")
  // console.log(html_to_generate)

  // fetch('/', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({html: html_to_generate})
  // })
  
    domtoimage.toPng(html_to_generate)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  

// html2canvas(document.querySelector("#emoji")).then(canvas => {
//     document.body.appendChild(canvas)
// });


})