const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;
let currentImages = [];

function updateImages() {
  currentImages = Array.from(document.querySelectorAll('.image-box:not([style*="display: none"]) img'));
}

document.querySelectorAll(".image-box img").forEach((img) => {
  img.addEventListener("click", () => {
    updateImages();
    currentIndex = currentImages.indexOf(img);
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

function nextImage() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function prevImage() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function filterImages(category, button) {
  document.querySelectorAll(".filters button").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  document.querySelectorAll(".image-box").forEach((box) => {
    if (category === "all" || box.classList.contains(category)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });

  updateImages();
}

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

updateImages();
