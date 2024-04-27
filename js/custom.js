// Define variables to store elements
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

// Wait for the DOM to be fully loaded
$(document).ready(() => {
  // Call searchByName function with empty string parameter
  searchByName("").then(() => {
    // Hide loading screen and enable scrolling
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

// Open the side navigation menu
function openSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();

  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  // Slide in navigation links
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 150
      );
  }
  $(document.body).animate({ "padding-left": boxWidth }, 500);
}

// Close the side navigation menu
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
  $(document.body).animate({ "padding-left": 0 }, 500);
}

// Initially close the side navigation menu
closeSideNav();

// Toggle the side navigation menu when icon is clicked
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// Display meals in the UI
function displayMeals(arr) {
  $("#rowData").addClass("py-5 m-5 gy-4");

  let cartoona = "";

  // Iterate through the array of meals and generate HTML
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3 class="display-6">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
    `;
  }

  // Update the HTML content of the rowData element
  rowData.innerHTML = cartoona;
}

// Fetch and display categories
async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

// Display categories in the UI
function displayCategories(arr) {
  // Add classes and hide search container
  $("#rowData").addClass("py-5 m-5 gy-4");
  $("#searchContainer").hide();

  let cartoona = "";

  // Iterate through categories and generate HTML
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-6 col-lg-4 col-xl-3 ">
            <div onclick="getCategoryMeals('${
              arr[i].strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${
                  arr[i].strCategoryThumb
                }" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p class="text-dark text-center fw-semibold">${
                      arr[i].strCategoryDescription.split(" ").length > 15
                        ? arr[i].strCategoryDescription
                            .split(" ")
                            .splice(0, 15)
                            .join(" ") + "..."
                        : arr[i].strCategoryDescription
                    }</p>
                </div>
            </div>
        </div>
    `;
  }

  // Update the HTML content of the rowData element
  rowData.innerHTML = cartoona;
}

// Fetch and display meals by area
async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();

  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

// Display areas in the UI
function displayArea(arr) {
  // Add classes and hide search container
  $("#rowData").addClass("py-5 m-5 gy-4");
  $("#searchContainer").hide();
  let cartoona = "";

  // Iterate through areas and generate HTML
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2  text-center cursor-pointer">
                <i class="fa-solid text-danger fa-city  fa-5x"></i>
                <h3 class="display-6">${arr[i].strArea}</h3>
            </div>
        </div>
    `;
  }

  // Update the HTML content of the rowData element
  rowData.innerHTML = cartoona;
}

// Fetch and display ingredients
async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();

  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// Display ingredients in the UI
function displayIngredients(arr) {
  $("#rowData").addClass("py-5 m-5 gy-4");
  $("#searchContainer").hide();

  let cartoona = "";

  // Iterate through ingredients and generate HTML
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div onclick="getIngredientsMeals('${
              arr[i].strIngredient
            }')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid text-success fa-bowl-food fa-4x"></i>
                <h3 class="display-6 text-white">${arr[i].strIngredient}</h3>
                <p>${
                  arr[i].strDescription.split(" ").length > 15
                    ? arr[i].strDescription.split(" ").splice(0, 15).join(" ") +
                      "..."
                    : arr[i].strDescription
                }     </p>
            </div>
        </div>
    `;
  }

  // Update the HTML content of the rowData element
  rowData.innerHTML = cartoona;
}

// Fetch and display meals by category
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// Fetch and display meals by area
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// Fetch and display meals by ingredients
async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// Fetch and display meal details
async function getMealDetails(mealID) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

// Display meal details in the UI
function displayMealDetails(meal) {
  $("#rowData").addClass("py-5 m-5 gy-4");

  let ingredients = ``;

  // Iterate through meal ingredients and generate HTML
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  // Iterate through tags and generate HTML
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  // Generate HTML for meal details
  let cartoona = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

  // Update the HTML content of the rowData element
  rowData.innerHTML = cartoona;
}

// Show search inputs
function showSearchInputs() {
  $("#searchContainer").show(200);

  // Generate HTML for search inputs
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent serachinpt contantInput text-white text-center  rounded-0 border-0 border-bottom" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"  class="form-control bg-transparent serachinpt contantInput text-white text-center  rounded-0 border-0 border-bottom" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = "";
}

// Search meals by name
async function searchByName(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  // Display search results
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

// Search meals by first letter
async function searchByFLetter(term) {
  if (term.length > 1) {
    return term;
  }
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  // Display search results
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

// Show contact form
function showContacts() {
  $("#searchContainer").hide(200);

  // Generate HTML for contact form
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
    <h4 class="display-5 pb-4">Contac Us...</h4>

        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control mb-2 contantInput text-white text-center bg-black rounded-0 border-0 border-bottom " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  $("#rowData").removeClass("py-5 m-5 gy-4");

  // Enable submit button only when all inputs are valid
  submitBtn = document.getElementById("submitBtn");

  // Add event listeners for input fields to track user interaction
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

// Track user interaction with input fields and validate inputs accordingly
function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      $("#nameInput").addClass("is-valid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      $("#nameInput").removeClass("is-valid");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      $("#emailInput").addClass("is-valid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      $("#emailInput").removeClass("is-valid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      $("#phoneInput").addClass("is-valid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      $("#phoneInput").removeClass("is-valid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      $("#ageInput").addClass("is-valid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      $("#ageInput").removeClass("is-valid");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      $("#passwordInput").addClass("is-valid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      $("#passwordInput").removeClass("is-valid");
    }
  }

  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      $("#repasswordInput").addClass("is-valid");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
      $("#repasswordInput").removeClass("is-valid");
    }
  }

  // Enable submit button only when all inputs are valid
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Validate name input
function nameValidation() {
  let regex = /^[a-zA-Z\s]*$/;
  return regex.test($("#nameInput").val());
}

// Validate email input
function emailValidation() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test($("#emailInput").val());
}

// Validate phone input
function phoneValidation() {
  let regex = /^01\d{9}$/;
  return regex.test($("#phoneInput").val());
}

// Validate age input
function ageValidation() {
  let regex = /^(\d{1,2}|100)$/;
  return regex.test($("#ageInput").val());
}

// Validate password input
function passwordValidation() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test($("#passwordInput").val());
}

// Validate repassword input
function repasswordValidation() {
  let password = $("#passwordInput").val();
  let repassword = $("#repasswordInput").val();
  return password === repassword;
}
