$(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("id");

  try {
    const meal = await getMealDetails(mealId);
    if (meal) {
      displayMealDetails(meal);
    } else {
      console.error(`Meal not found for ID: ${mealId}`);
    }

  } catch (error) {
    console.error("Error fetching and displaying meal details:", error);
  }
});

async function getMealDetails(mealId) {
  if (!mealId) {
    throw new Error("Meal ID is null or undefined.");
  }

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let data = await response.json();
    return data.meals && data.meals.length > 0 ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    throw error; // Propagate the error
  }
}

function displayMealDetails(meal) {
  if (!meal) {
    console.error("Meal details are undefined or null.");
    return;
  }

  let ingredients = "";
  // Loop through possible ingredients and measures
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];
    // Check if ingredient and measure are present and not empty
    if (
      ingredient &&
      ingredient.trim() !== "" &&
      measure &&
      measure.trim() !== ""
    ) {
      ingredients += `<li>${measure} ${ingredient}</li>`;
    }
  }

  let mealDetailsHtml = `
    <div class="col-md-4">
      <div class="meal-image">
        <img src="${meal.strMealThumb}" class="w-100 meal-img" alt="Food image">
        <h5 class="card-title">${meal.strMeal}</h5>
      </div>
    </div>
    <div class="col-md-8">
      <div class="meal-content">
        <p class="card-text"><strong class="instuction-title">Instructions : </strong>${
          meal.strInstructions
        }</p>
        <p><strong class="titles">Area:</strong> ${meal.strArea}</p>
        <p><strong class="titles">Category:</strong> ${meal.strCategory}</p>
        <p><strong class="titles">Recipes:</strong></p>
        <ul class="recipes">${ingredients}</ul>
        ${
          meal.strSource
            ? `<a href="${meal.strSource}" class="btn src-btn btn-sm" target="_blank">Source</a>`
            : "N/A"
        }
        ${
          meal.strYoutube
            ? `<a href="${meal.strYoutube}" class="btn youtube-btn btn-sm" target="_blank">YouTube</a>`
            : "N/A"
        }
      </div>
    </div>
  `;

  // Ensure "#row" exists in your HTML where you want to inject mealDetailsHtml
  $("#row").html(mealDetailsHtml);
}
function viewMeals(meals) {
  let mealList = document.getElementById("mealList");
  mealList.innerHTML = "";

  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;

    // Create HTML for each meal item with a link to mealDetails.html
    let mealItemHtml = `
      <div class="col-md-3 mb-4 meal-item">
        <a href="mealDetails.html?id=${mealId}" class="meal-link">
          <div class="meals" data-mealid="${mealId}">
            <div class="meals-img mb-3">
              <img class="thumbnail w-100" src="${imgSrc}" alt="${mealName} Image">
              <div class="overlay">
                <div class="meal-name">${mealName}</div>
              </div>
            </div>
          </div>
        </a>
      </div>`;

    // Append HTML to the meal list
    mealList.innerHTML += mealItemHtml;
  });

  console.log(`Displayed meals for category`);
}

