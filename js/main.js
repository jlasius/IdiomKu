// Go back to the previous page
window.goBack = function () {
  window.history.back();
};

// Fisher-Yates shuffle algorithm to randomize array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
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
        // Randomize the idioms array
        const shuffledIdioms = shuffleArray(categoryData.idioms);

        document.getElementById("category-title").textContent = categoryData.name;
        let currentIndex = 0;

        // Display first idiom
        displayIdiom(shuffledIdioms[currentIndex]);

        // Flip card function
        window.flipCard = function () {
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");
          translationText.classList.toggle("d-none");
        };

        // Go to the next card
        window.nextCard = function () {
          currentIndex = (currentIndex + 1) % shuffledIdioms.length;
          displayIdiom(shuffledIdioms[currentIndex]);
        };

        // Go to the previous card
        window.previousCard = function () {
          currentIndex = (currentIndex - 1 + shuffledIdioms.length) % shuffledIdioms.length;
          displayIdiom(shuffledIdioms[currentIndex]);
        };

        // Display idiom
        function displayIdiom(idiom) {
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");

          // Display the idiom (centered)
          idiomText.textContent = idiom.idiom;

          // Display the translation, explanation, and examples (left-aligned)
          translationText.innerHTML = `
            <strong>Translation:</strong> ${idiom.translation}<br>
            <strong>Explanation:</strong> ${idiom.explanation}<br>
            <strong>Example (BM):</strong> ${idiom.example.BM}<br>
            <strong>Example (English):</strong> ${idiom.example.English}
          `;

          // Hide the translation initially
          translationText.classList.add("d-none");
        }

        // Add keyboard event listeners
        document.addEventListener("keydown", (event) => {
          switch (event.code) {
            case "Space": // Flip card on spacebar
              event.preventDefault(); // Prevent scrolling
              flipCard();
              break;
            case "ArrowLeft": // Previous card on left arrow
              previousCard();
              break;
            case "ArrowRight": // Next card on right arrow
              nextCard();
              break;
          }
        });

        // Add swipe functionality for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener("touchstart", (event) => {
          touchStartX = event.touches[0].clientX;
        });

        document.addEventListener("touchend", (event) => {
          touchEndX = event.changedTouches[0].clientX;
          handleSwipe();
        });

        function handleSwipe() {
          const swipeThreshold = 50; // Minimum swipe distance in pixels
          const swipeDistance = touchEndX - touchStartX;

          if (swipeDistance > swipeThreshold) {
            // Swipe right → go to the previous card
            previousCard();
          } else if (swipeDistance < -swipeThreshold) {
            // Swipe left → go to the next card
            nextCard();
          }
        }
      }
    }
  })
  .catch(error => console.error("Error loading idioms:", error));
