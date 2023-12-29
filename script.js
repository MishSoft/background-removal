import api from "./api.js";

let imageURL;
let imgElement;

const uploadButton = document.getElementById("uploadBtn");
const downloadButton = document.getElementById("downloadBtn");

uploadButton.addEventListener("click", submitHandler);
downloadButton.addEventListener("click", downloadFile);

function submitHandler() {
  // console.log("click");
  const fileInput = document.getElementById("fileInput");
  // console.log(fileInput.files);
  const image = fileInput.files[0];

  // Multipart file
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": api,
    },
    body: formData,
  })
    .then(function (reponse) {
      return reponse.blob();
    })
    .then(function (blob) {
      let result = document.querySelector(".result");
      const url = URL.createObjectURL(blob);
      imageURL = url;

      if (imgElement) {
        result.removeChild(imgElement);
      }

      imgElement = document.createElement("img");
      imgElement.src = url;
      result.appendChild(imgElement);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function downloadFile() {
  if (imageURL) {
    var anchorElement = document.createElement("a"); //<a></a>
    anchorElement.href = imageURL;
    anchorElement.download = "test.png";
    document.body.appendChild(anchorElement);

    anchorElement.click();

    document.body.removeChild(anchorElement);

    // Remove the image from the result div
    if (imgElement) {
      let result = document.querySelector(".result");
      result.removeChild(imgElement);
      imgElement = null;
    }
  }
}
