async function fetchMealDetails(mealId) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let data = await response.json();
    return data.meals[0] || null;
  } catch (error) {
    console.error(`Error fetching meal details for ID ${mealId}:`, error);
    return null;
  }
}

function displayMealDetails(meal) {
  let mealDetails = document.getElementById("mealDetailss");

  if (meal) {
    mealDetails.innerHTML = `
          <h1 class="text-center">${meal.strMeal}</h1>
          <div class="row">
            <div class="col-md-6">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal} Image" class="meal-img">
            </div>
            <div class="col-md-6">
              <h3>Category: ${meal.strCategory}</h3>
              <h3>Area: ${meal.strArea}</h3>
              <p>${meal.strInstructions}</p>
              <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
          </div>
        `;
  } else {
    mealDetails.innerHTML = "<p>Meal details not found.</p>";
  }
}

// Fetch meal details based on meal ID from localStorage
let selectedMealId = localStorage.getItem("selectedMealId");

if (selectedMealId) {
  fetchMealDetails(selectedMealId)
    .then((meal) => {
      displayMealDetails(meal);
    })
    .catch((error) => {
      console.error(
        `Failed to fetch meal details for ID ${selectedMealId}:`,
        error
      );
    });
} else {
  console.error("No meal ID selected.");
}
