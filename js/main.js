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
        window.flipCard = function () {
          const flashcard = document.getElementById("flashcard");
          flashcard.classList.toggle("flipped");
        };

        // Go to the next card
        window.nextCard = function () {
          const flashcard = document.getElementById("flashcard");
          if (flashcard.classList.contains("flipped")) {
            flashcard.classList.remove("flipped"); // Reset flip state
          }
          currentIndex = (currentIndex + 1) % categoryData.idioms.length;
          displayIdiom(categoryData.idioms[currentIndex]);
        };

        // Go to the previous card
        window.previousCard = function () {
          const flashcard = document.getElementById("flashcard");
          if (flashcard.classList.contains("flipped")) {
            flashcard.classList.remove("flipped"); // Reset flip state
          }
          currentIndex = (currentIndex - 1 + categoryData.idioms.length) % categoryData.idioms.length;
          displayIdiom(categoryData.idioms[currentIndex]);
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
