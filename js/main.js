// Sample idiom data (replace with your JSON file later)
const idioms = {
  emotions: [
    { idiom: "Ada hati", translation: "To have feelings", explanation: "Used to describe someone who has romantic feelings for someone else." },
    { idiom: "Hati kering", translation: "Dry heart", explanation: "Used to describe someone who is unemotional or indifferent." }
  ],
  work: [
    { idiom: "Kerja keras", translation: "Hard work", explanation: "Putting in a lot of effort to achieve something." }
  ]
};

let currentCategory = "emotions";
let currentIndex = 0;

// Load category from URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("category")) {
  currentCategory = urlParams.get("category");
  document.getElementById("category-title").textContent = currentCategory.replace(/\b\w/g, l => l.toUpperCase());
}

// Flip card function
function flipCard() {
  const idiomText = document.getElementById("idiom-text");
  const translationText = document.getElementById("translation-text");
  if (idiomText.textContent === "Click to Start") {
    idiomText.textContent = idioms[currentCategory][currentIndex].idiom;
    translationText.textContent = idioms[currentCategory][currentIndex].translation + ": " + idioms[currentCategory][currentIndex].explanation;
  } else {
    idiomText.textContent = idioms[currentCategory][currentIndex].idiom;
    translationText.textContent = idioms[currentCategory][currentIndex].translation + ": " + idioms[currentCategory][currentIndex].explanation;
  }
  translationText.classList.toggle("d-none");
}

// Mark as remembered
function markRemembered() {
  currentIndex = (currentIndex + 1) % idioms[currentCategory].length;
  flipCard();
}

// Mark for review
function markReview() {
  currentIndex = (currentIndex + 1) % idioms[currentCategory].length;
  flipCard();
}
