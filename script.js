const loadingDiv = document.getElementById("loading");
const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

async function downloadImages() {
  // Show loading text
  loadingDiv.style.display = "block";
  outputDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  try {
    // Download images in parallel using Promise.all
    const downloadedImages = await Promise.all(images.map(img => downloadImage(img.url)));

    // Hide loading text
    loadingDiv.style.display = "none";

    // Append images to the output div
    downloadedImages.forEach(img => outputDiv.appendChild(img));
  } catch (error) {
    // Hide loading text and show error message
    loadingDiv.style.display = "none";
    errorDiv.innerText = error;
  }
}

// Attach event listener to the button
btn.addEventListener("click", downloadImages);
