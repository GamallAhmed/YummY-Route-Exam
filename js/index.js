
let meals = [];

function saveToLocalStorage() {
  localStorage.setItem("meals", JSON.stringify(meals));
}


// Featch Details 
$(function () {
  $(document).on("click", ".meals, .meals-img, .overlay", function () {
    let mealId = $(this).closest(".meals").data("mealid");
    window.location.href = `details.html?id=${mealId}`;
  });
});
window.addEventListener("load", function () {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.classList.add("hidden");
});
function viewMeals(meals) {
  let table = "";
  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;
    table += `
      <div class="col-md-3 home2">
        <div class="meals" data-mealid="${mealId}">
          <div class="meals-img mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="Thumbnail">
            <div class="overlaay">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;
  });
  document.getElementById("row").innerHTML = table;
}

function getDefaultMeals() {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((data) => {
      let meals = data.meals;
      saveToLocalStorage(meals);
      viewMeals(meals);
    })
    .catch((error) => {
      console.error("Error fetching meals:", error);
    });
}
function saveToLocalStorage(meals) {
  localStorage.setItem("meals", JSON.stringify(meals));
}
getDefaultMeals();


$(function () {
  let isOpen = false;

  $("#opn-button").click(function () {
    if (!isOpen) {
      $(".sideBar").css("left", "0");
      $(".side-nav").css("left", "200px");
      $("#opn-button").removeClass("fa-align-justify").addClass("fa-times");
      isOpen = true;

      $(".navbar-nav li").each(function (index) {
        $(this)
          .delay(150 * index)
          .queue(function () {
            $(this).addClass("active").dequeue();
          });
      });
    } else {
      $(".sideBar").css("left", "-200px");
      $(".side-nav").css("left", "0");
      $("#opn-button").removeClass("fa-times").addClass("fa-align-justify");
      isOpen = false;

      $(".navbar-nav li").removeClass("active");
    }
  });
});


//search



document.addEventListener("DOMContentLoaded", function () {
  let meals = []; 
  async function searchMeals(searchTerm) {
    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      let data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching meals:", error);
      return []; 
    }
  }


function displaySearchedMeals(meals) {
  let mealListHtml = "";
  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;
    mealListHtml += `
      <div class="col-md-3 search">
        <div class="meals" data-mealid="${mealId}">
          <div class="meals-img mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="Thumbnail">
            <div class="overlay-Search">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;
  });
  document.getElementById("mealList").innerHTML = mealListHtml;
}



  document
    .getElementById("searchButton")
    .addEventListener("click", async function () {
      let searchTerm = document.getElementById("searchInput").value.trim();
      if (searchTerm) {
        let searchedMeals = await searchMeals(searchTerm);
        displaySearchedMeals(searchedMeals); 
      } else {
        console.log("Please enter a search term.");
      }
    });
});

// Search By first Letter



document.addEventListener("DOMContentLoaded", function () {
  let meals = [];

  
  async function searchMealsByFirstLetter(letter) {
    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      let data = await response.json();
      return data.meals || []; 
    } catch (error) {
      console.error("Error fetching meals:", error);
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
        <div class="col-md-3 search">
        <div class="meals" data-mealid="${mealId}">
          <div class="meals-img mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="Thumbnail">
            <div class="overlay-Search">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;
    });
    document.getElementById("mealList").innerHTML = table;
  }

  document
    .getElementById("searchButtonLetter")
    .addEventListener("click", async function () {
      let searchTerm = document
        .getElementById("searchInputForLetter")
        .value.trim();
      if (searchTerm) {
        let firstLetter = searchTerm.charAt(0).toLowerCase(); 
        let searchedMeals = await searchMealsByFirstLetter(firstLetter);
        displaySearchedMeals(searchedMeals); 
      } else {
        console.log("Please enter a search term.");
      }
    });
});


//area


async function fetchMealAreas() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let data = await response.json();
    return data.meals || [];
    
  } catch (error) {
    console.error("Error fetching meal areas:", error);
    return [];
  }
}
function displayMealAreas(areas) {
  const areaList = document.getElementById("areaList");
  let areasHtml = "";

  areas.forEach((area) => {
    let areaName = area.strArea;
    areasHtml += `
      <div class="col-md-3">
        <div class="area-item text-center" data-area="${areaName}">
          <div class="area-icon text-center">
            <span><i class="fa-solid fa-house-laptop"></i></span>
          </div>
          <div>${areaName}</div>
        </div>
      </div>
    `;
  });

  areaList.innerHTML = areasHtml;


  document.querySelectorAll(".area-item").forEach((areaItem) => {
    areaItem.addEventListener("click", function () {
      let areaName = this.getAttribute("data-area");
      localStorage.setItem("selectedArea", areaName); 
      window.location.href = "../mealOfArea.html";
    });


    areaItem
      .querySelector(".fa-house-laptop")
      .addEventListener("click", function (event) {
        event.stopPropagation(); 
        let areaName = areaItem.getAttribute("data-area");
        localStorage.setItem("selectedArea", areaName); 
        window.location.href = "../mealOfArea.html"; 
      });
  });
}
fetchMealAreas()
  .then((areas) => {
    displayMealAreas(areas);
  })
  .catch((error) => {
    console.error("Failed to fetch meal areas:", error);
  });
document.addEventListener("DOMContentLoaded", function () {
  const selectedArea = localStorage.getItem("selectedArea");

  if (selectedArea) {
    console.log(`Selected area: ${selectedArea}`);
  } else {
    console.error("No selected area found in localStorage");
  }
});

// ingredients


async function fetchAllIngredients() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    let data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
}

function displayIngredients(ingredients) {
  let ingredientsList = document.getElementById("ingredientsList");
  let ingredientsHtml = "";

  ingredients.slice(0, 20).forEach((ingredient) => {
    let ingredientName = ingredient.strIngredient;
    let ingredientDescription = ingredient.strDescription;
    if (ingredientDescription.split(" ").length > 15) {
      ingredientDescription =
        ingredientDescription.split(" ").slice(0, 20).join(" ") + " ...";
    }

    ingredientsHtml += `
      <div class="col-md-3 mb-4 ingredient-item" data-ingredient="${encodeURIComponent(
        ingredientName
      )}">
      <div class="ingredients-icon text-center">
      <span><i class="fa-solid fa-drumstick-bite fa-4x"></i></span>
      </div>
      <h2 class="text-center">${ingredientName}</h2>
      <p class="text-center">${ingredientDescription}</p>
      </div>
      `;
  });

  ingredientsList.innerHTML = ingredientsHtml;
  let ingredientItems =
    ingredientsList.getElementsByClassName("ingredient-item");
  Array.from(ingredientItems).forEach((item) => {
    item.addEventListener("click", function () {
      let ingredientName = decodeURIComponent(
        this.getAttribute("data-ingredient")
      );
      localStorage.setItem("selectedIngredient", ingredientName);
      window.location.href = "../ingredientsMeals.html";
    });
  });
}

async function fetchMealsByIngredient(ingredientName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
    );
    let data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(
      `Error fetching meals for ingredient ${ingredientName}:`,
      error
    );
    return [];
  }
}

function displayMeals(meals) {
  let mealLists = document.getElementById("mealsIngredients");
  let mealsHtml = "";

  meals.forEach((meal) => {
    let imgSrc = meal.strMealThumb;
    let mealName = meal.strMeal;
    let mealId = meal.idMeal;

    mealsHtml += `
      <div class="col-md-3 mb-4">
        <div class="meal-item11" data-mealid="${mealId}">
          <div class="ingredient-meal-img1 mb-3">
            <img class="thumbnail w-100" src="${imgSrc}" alt="${mealName} Image">
            <div class="overlay" data-mealid="${mealId}">
              <div class="meal-name">${mealName}</div>
            </div>
          </div>
        </div>
      </div>`;
  });

  mealLists.innerHTML = mealsHtml;

 
  let mealItems = document.querySelectorAll(".meal-item11");
  mealItems.forEach((item) => {
    item.addEventListener("click", () => {
      let mealId = item.getAttribute("data-mealid");
      localStorage.setItem("selectedMealId", mealId);
      window.location.href = "details.html";
    });

    let overlay = item.querySelector(".overlay");
    overlay.addEventListener("click", (event) => {
      event.stopPropagation();
      let mealId = overlay.getAttribute("data-mealid");
      localStorage.setItem("selectedMealId", mealId);
      window.location.href = `../details.html?mealId=${mealId}`;
    });
  });
}


async function fetchMealDetails(mealId) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal details for ID ${mealId}:`, error);
    return null;
  }
}

function displayMealDetails(meal) {
  if (!meal) {
    console.error("Meal details not found.");
    return;
  }

  let mealDetailsDiv = document.getElementById("mealDetails");
  let mealHtml = `
    <div class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal} Image">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
      </div>
    </div>`;

  mealDetailsDiv.innerHTML = mealHtml;
}


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


fetchAllIngredients()
  .then((ingredients) => {
    displayIngredients(ingredients);
  })
  .catch((error) => {
    console.error("Failed to fetch ingredients:", error);
  });


let selectedIngredient = localStorage.getItem("selectedIngredient");

if (selectedIngredient) {
  fetchMealsByIngredient(selectedIngredient)
    .then((meals) => {
      displayMeals(meals);
    })
    .catch((error) => {
      console.error(
        `Failed to fetch meals for ingredient ${selectedIngredient}:`,
        error
      );
    });
} else {
  console.error("No ingredient selected.");
}

