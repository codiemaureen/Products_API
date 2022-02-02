require('dotenv').config('env');
const baseEndpoint = `https://api.spoonacular.com/food/products/`;
const proxy = `https://cors-anywhere.herokuapp.com/`


async function fetchRecipes(query){
  const res = await fetch(`${proxy}${baseEndpoint}search?query=${query}&apiKey=${process.env.API_KEY}`, {
    headers: {
      Accept: 'application/json',
    }
  });
  const data = await res.json();
  console.table(data.products);
};

fetchRecipes('oranges');