






// Fetch Categories meals

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


function viewMeals(meals) {
  let mealList = document.getElementById("mealList");
  mealList.innerHTML = "";

  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;

    let mealItemHtml = `
      <div class="col-md-3 mb-4 meal-item">
        <div class="meals" data-mealid="${mealId}">
          <div class="meals-img mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="${mealName} Image">
            <div class="overlay-category">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;


    mealList.innerHTML += mealItemHtml;
  });

  console.log(`Displayed meals for category`);
}


function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}


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

