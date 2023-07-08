const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let loadImage = 10;
const apiKey = "rGYAm5lob8BG5ZRhXv97jImY00OedR9U-ny8lntDwAo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadImage}`;

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    loadImage = 30;
  }
  return;
};

const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;
    img.title = photo.alt_description;

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);

    imageContainer.appendChild(item);
  });
};

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();

// const imgData = data
//   .map((e) => {
//     return `<img
//   src="${e.urls.regular}"
//   alt=""
// />`;
//   })
//   .join("");

// imageContainer.insertAdjacentHTML("beforeend", imgData);
