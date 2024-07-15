async function fetchMealsByArea(areaName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    );
    let data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for area ${areaName}:`, error);
    return [];
  }
}

function displaySearchedMeals(meals) {
  let table = "";
  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;
    table += `
          <div class="col-md-3">
            <div class="meals" data-mealid="${mealId}">
              <div class="meals-img3 mb-3">
                <img class="thumbnail w-100" src="${imgSrc}" alt="Thumbnail">
                <div class="overlay-area3">
                  <div class="meal-name-area">${mealName}</div>
                </div>
              </div>
            </div>
          </div>`;
  });
  document.getElementById("areaMealList").innerHTML = table;


  document.querySelectorAll(".meals-area").forEach((mealElement) => {
    mealElement.addEventListener("click", function () {
      let mealId = this.getAttribute("data-mealid");
      localStorage.setItem("selectedMealId", mealId);
      window.location.href = `../areaMealsDetails.html?id=${mealId}`; 
    });
  });
}


let selectedArea = localStorage.getItem("selectedArea");
if (selectedArea) {
  fetchMealsByArea(selectedArea)
    .then((meals) => {
      displaySearchedMeals(meals);
    })
    .catch((error) => {
      console.error(`Failed to fetch meals for area ${selectedArea}:`, error);
    });
} else {
  console.error("No selected area found in localStorage");
}
