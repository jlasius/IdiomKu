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









// Load idioms from JSON
fetch('js/idioms.json')
  .then(response => response.json())
  .then(data => {
    const idioms = data.categories;
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (category) {
      const categoryData = idioms.find(cat => cat.name.toLowerCase().includes(category));
      if (categoryData) {
        document.getElementById("category-title").textContent = categoryData.name;
        let currentIndex = 0;

        // Display first idiom
        displayIdiom(categoryData.idioms[currentIndex]);

        // Flip card function
        function flipCard() {
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");
          translationText.classList.toggle("d-none");
        }

        // Display next idiom
        function nextIdiom() {
          currentIndex = (currentIndex + 1) % categoryData.idioms.length;
          displayIdiom(categoryData.idioms[currentIndex]);
        }

        // Display idiom
        function displayIdiom(idiom) {
          document.getElementById("idiom-text").textContent = idiom.idiom;
          document.getElementById("translation-text").textContent = `${idiom.translation}: ${idiom.explanation}`;
        }

        // Add event listeners
        document.querySelector(".btn-primary").addEventListener("click", flipCard);
        document.querySelector(".btn-success").addEventListener("click", nextIdiom);
        document.querySelector(".btn-warning").addEventListener("click", nextIdiom);
      }
    }
  });

