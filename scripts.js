require('dotenv').config('env');
const baseEndpoint = `https://api.spoonacular.com/food/products/`;
const proxy = `https://cors-anywhere.herokuapp.com/`
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

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
  const el = e.currentTarget;
  //turn the form off
  el.submit.disabled = true;
  //submitting the search
  const recipes = await fetchRecipes(el.query.value);
  console.log(recipes);
  el.submit.disabled = false;
  displayRecipes(recipes.products);

};

function displayRecipes(recipes){
  console.log('Creating the HTML');
  const html = recipes.map(recipe =>  `
      <div>
        <h2>${recipe.title}<h2>
        ${recipe.image && `<img src="${recipe.image}" alt="${recipe.title}"/>`}
      </div>`
  );
  recipesGrid.innerHTML = html.join(' ');
};

form.addEventListener('submit', handleSubmit);
fetchRecipes('pizza');