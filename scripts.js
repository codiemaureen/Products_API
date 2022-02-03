const baseEndpoint = `https://api.spoonacular.com/food/products/`;
const proxy = `https://cors-anywhere.herokuapp.com/`
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');
require('dotenv').config('env');

async function fetchRecipes(query){
  const res = await fetch(`${proxy}${baseEndpoint}search?query=${query}&apiKey=${process.env.API_KEY}`, {
    headers: {
      Accept: 'application/json',
    }
  });
  const data = await res.json();
  return data;
};

async function handleSubmit(e){
  e.preventDefault();
  fetchAndDisplay(form.query.value);

};

async function fetchAndDisplay(query){
    //turn the form off
  form.submit.disabled = true;
  //submitting the search
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes.products);
  
};

function displayRecipes(recipes){
  console.log('Creating the HTML');
  const html = recipes.map((recipe) =>  `
      <div>
        <h2>${recipe.title}<h2>
        ${recipe.image && `<img src="${recipe.image}" alt="${recipe.title}"/>`}
      </div>`
  );
  recipesGrid.innerHTML = html.join(' ');
};

form.addEventListener('submit', handleSubmit);
//Display product on page load
fetchAndDisplay('Strawberry');