






// Fetch Categories meals

// Function to fetch meals by category
async function fetchMealsByCategory(categoryName) {
  try {
    console.log(`Fetching meals for category: ${categoryName}`);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    let data = await response.json();
    console.log(`Fetched meals:`, data.meals);
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for category ${categoryName}:`, error);
    return [];
  }
}

// Function to dynamically display meals
function viewMeals(meals) {
  let mealList = document.getElementById("mealList");
  mealList.innerHTML = "";

  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;

    // Create HTML for each meal item
    let mealItemHtml = `
      <div class="col-md-3 mb-4 meal-item">
        <div class="meals" data-mealid="${mealId}">
          <div class="meals-img mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="${mealName} Image">
            <div class="overlay">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;

    // Append HTML to the meal list
    mealList.innerHTML += mealItemHtml;
  });

  console.log(`Displayed meals for category`);
}

// Function to get category name from URL
function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}

// Main logic to fetch and display meals
const categoryName = getCategoryFromUrl();

if (categoryName) {
  console.log(`Category name from URL: ${categoryName}`);
  fetchMealsByCategory(categoryName)
    .then((meals) => {
      viewMeals(meals);
    })
    .catch((error) => {
      console.error(
        `Failed to fetch meals for category ${categoryName}:`,
        error
      );
    });
} else {
  console.error("No category found in URL");
}

