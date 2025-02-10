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
          const idiomText = document.getElementById("idiom-text");
          const translationText = document.getElementById("translation-text");
          
          idiomText.textContent = idiom.idiom;
          translationText.textContent = `${idiom.translation}: ${idiom.explanation}`;
          translationText.classList.add("d-none"); // Hide translation initially
        }

        // Add event listeners
        document.querySelector(".btn-primary").addEventListener("click", flipCard);
        document.querySelector(".btn-success").addEventListener("click", nextIdiom);
        document.querySelector(".btn-warning").addEventListener("click", nextIdiom);
      }
    }
  })
  .catch(error => console.error("Error loading idioms:", error));
