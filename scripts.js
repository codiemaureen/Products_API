require('dotenv').config('env');
const baseEndpoint = `https://api.spoonacular.com/food/products/`;
const proxy = `https://cors-anywhere.herokuapp.com/`
const form = document.querySelector('form.search');

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
  el.submit.disabled = false;
  //submitting the search
  const recipes = await fetchRecipes(el.query.value);
  displayRecipes(recipes.products);

};

function displayRecipes(recipes){
  console.log('Creating HTML');
  const html = recipes.map(recipe =>  `
      <div>
        <h2>${recipe.title}<h2>
        <p>${recipe.ingredients}</p>
        ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
      </div>`
  );
  console.log(html);
};

form.addEventListener('submit', handleSubmit);
fetchRecipes('pizza');