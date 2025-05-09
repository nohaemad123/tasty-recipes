const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

const url = "https://forkify-api.herokuapp.com/api/search?q=";

async function fetchData(meal) {
  try {
    let response = await fetch(url + meal);
    let data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    document.getElementById("recipes_row").innerHTML =
      "<div class='alert alert-danger error_msg' role='alert'>Not recipes</div>";
  }
}

function displayRecipes(recipes) {
  let cartona = "";
  for (let i = 0; i < recipes.length; i++) {
    cartona += `
          <div class="col-md-3 ">
            <div class="text-center">
              <div class="card">
                <img src="${recipes[i].image_url}" class="card-img-top " alt="" />
                <div class="card-body">
                  <h5 class="card-title">${recipes[i].title}</h5>
                  <p class="card-text">
                  ${recipes[i].publisher}
                  </p>
                    <a
                class="btn btn-outline-warning rounded-pill"
                id="btn-pizza" 
target='_blanck'                href="${recipes[i].source_url}"
              >
                Read more
              </a>
                </div>
              </div>
            </div>
          </div>
`;
  }
  document.getElementById("recipes_row").innerHTML = cartona;
}
fetchData("pasta");

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  fetchData(inputSearch.value);
});
