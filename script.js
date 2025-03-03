//your JS code here. If required.
const loadingDiv = document.getElementById("loading");
const outputDiv = document.getElementById("output");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve,reject)=>{
		const img = new Image();
		img.src = url;
		img.onload = ()=>resolve(img);
		img.onerror = ()=>reject(`failed to load image: ${url}`);
	})
}
async function dowmloadImages(){
	loadingDiv.style.display = "block";
	output.innerHTML = "";
	errorDiv.innerHTML = "";
	try{
		const images = await Promise.all(images.map(downloadImage));
		loadingDiv.style.display = "none";
		images.forEach(img => outputDiv.appendChild(img));
	}
	catch(error){
		loadingDiv.style.display = "none";
        errorDiv.innerText = error;
	}
	downloadImages();
}