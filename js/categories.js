async function fetchMealCategories() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching meal categories:", error);
    return [];
  }
}

function viewCategories(categories) {
  let table = "";
  if (categories.length === 0) {
    table = `<div class="col-md-12">No categories found.</div>`;
  } else {
    categories.forEach((category) => {
      let imgSrc = category.strCategoryThumb;
      let categoryName = category.strCategory;
      table += `
        <div class="col-md-3">
          <div class="category" data-categoryid="${categoryName}">
            <div class="category-img mb-3">
              <img class="thumbnail w-100" src="${imgSrc}" alt="Category Image">
              <div class="category-overlay">
                <div class="Category-meal-name">${categoryName}</div>
              </div>
            </div>
          </div>
        </div>`;
    });
  }
  document.getElementById("catogries").innerHTML = table;

  if (categories.length > 0) {
    document.querySelectorAll(".category").forEach((categoryElement) => {
      categoryElement.addEventListener("click", function () {
        let categoryName = this.getAttribute("data-categoryid");
        window.location.href = `mealsOfCategory.html?category=${encodeURIComponent(
          categoryName
        )}`;
      });
    });
  }
}

async function init() {
  try {
    const categories = await fetchMealCategories();
    viewCategories(categories);
  } catch (error) {
    console.error("Failed to initialize:", error);
    document.getElementById(
      "categories"
    ).innerHTML = `<div class="col-md-12">Failed to fetch categories.</div>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
