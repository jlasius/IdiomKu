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
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");
          translationText.classList.toggle("d-none");
        };

        // Mark as remembered
        window.markRemembered = function () {
          currentIndex = (currentIndex + 1) % categoryData.idioms.length;
          displayIdiom(categoryData.idioms[currentIndex]);
        };

        // Mark for review
        window.markReview = function () {
          currentIndex = (currentIndex + 1) % categoryData.idioms.length;
          displayIdiom(categoryData.idioms[currentIndex]);
        };

        // Display idiom
        function displayIdiom(idiom) {
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");
          
          idiomText.textContent = idiom.idiom;
          translationText.textContent = `${idiom.translation}: ${idiom.explanation}`;
          translationText.classList.add("d-none"); // Hide translation initially
        }
      }
    }
  })
  .catch(error => console.error("Error loading idioms:", error));
