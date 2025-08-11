async function getRecipe() {
    var response = await fetch(`https://dummyjson.com/recipes`);
    var data = await response.json();
    var recipes = data.recipes;

    var temp = "";
    for (let i = 0; i < recipes.length; i++) {
        temp += `
            <div class="item">
                <img src="${recipes[i].image}" alt="">
                <h4>${recipes[i].name}</h4>
                <button onclick="showRecipe(${recipes[i].id})">Recipe</button>
            </div>
        `;
    }

    document.getElementById('result').innerHTML = temp;
}

async function filterByName() {
    let search_input = document.getElementById('search_input').value.toLowerCase();

    var response = await fetch(`https://dummyjson.com/recipes`);
    var data = await response.json();
    var recipes = data.recipes;

    var temp = "";
    for (let i = 0; i < recipes.length; i++) {
        let name = recipes[i].name.toLowerCase();
        if (name.indexOf(search_input) > -1) {
            temp += `
                <div class="item">
                    <img src="${recipes[i].image}" alt="">
                    <h4>${recipes[i].name}</h4>
                    <button onclick="showRecipe(${recipes[i].id})">Recipe</button>
                </div>
            `;
        }
    }

    document.getElementById('result').innerHTML = temp;
}

async function showRecipe(id) {
    let res = await fetch(`https://dummyjson.com/recipes/${id}`);
    let recipe = await res.json();

    // Fill modal content
    document.getElementById('modal-title').innerText = recipe.name;
    document.getElementById('modal-img').src = recipe.image;

    // Ingredients list
    document.getElementById('modal-ingredients').innerHTML = recipe.ingredients
        .map(i => `<li>${i}</li>`)
        .join('');

    // Step-by-step instructions
    document.getElementById('modal-instructions').innerHTML = recipe.instructions
        .map((step, index) => `<p><strong>Step ${index + 1}:</strong> ${step}</p>`)
        .join('');

    // Show modal
    document.getElementById('recipeModal').style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}
