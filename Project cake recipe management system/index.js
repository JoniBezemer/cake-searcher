'use strict';

const readline = require('readline');
const cakeRecipes = require("./cake-recipes.json");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let savedIngredients = [];

const getUniqueAuthors = (recipes) => {
  const authors = [];

  recipes.forEach((recipe) => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });

  return authors;
};

const logUniqueAuthors = () => {
  const uniqueAuthors = getUniqueAuthors(cakeRecipes);
  console.log("Unique Authors:");
  console.log(uniqueAuthors);
};

//function that logs the name of each recipe
const logRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found.");
  } else {
    recipes.forEach(({ Name }) => {
      console.log(`Recipe Name: ${Name}`);
    });
  }
};

//function that returns all recipes of a given author
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter((recipe) => recipe.Author === author);
};

//function that returns a list of recipes that contain a given ingredient
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter((recipe) => recipe.Ingredients.some((item) => item.toLowerCase().includes(ingredient.toLowerCase())));
};
//function that takes a list of recipes and a (string) as input
const getRecipeByName = (recipes, name) => {
  return recipes.find((recipe) => recipe.Name.toLowerCase().includes(name.toLowerCase()));
};
//function that returns all ingredients of a given recipe list into a single array.
const getAllIngredients = (recipes) => {
  return recipes.reduce((acc, recipe) => {
    return acc.concat(recipe.Ingredients);
  }, []);
};
// save ingredents
const saveIngredientsToList = (ingredients) => {
  savedIngredients = savedIngredients.concat(ingredients);
  console.log("Ingredients saved successfully!");
};




//function display menu
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("6. Save ingredients of a recipe");
  console.log("0. Exit");

  rl.question("Enter a number (1-6) or 0 to exit: ", (answer) => {
    const choice = parseInt(answer);
    handleChoice(choice);
  });
};

const handleChoice = (choice) => {
  switch (choice) {
    case 1:
      logUniqueAuthors();
      displayMenu();
      break;
    case 2:
      rl.question("Enter author name: ", (author) => {
        const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author)
        logRecipeNames(recipesByAuthor);
        displayMenu();
      });
      break;
    case 3:
      rl.question("Enter ingredient: ", (ingredient) => {
        const recipesByIngredient = getRecipesByIngredient(cakeRecipes, ingredient);
        logRecipeNames(recipesByIngredient);
        displayMenu();
      });
      break;
    case 4:
      rl.question("Enter recipe name: ", (name) => {
        const foundRecipe = getRecipeByName(cakeRecipes, name);
        if (foundRecipe) {
          console.log("Found Recipe:");
          console.log(foundRecipe);
          rl.question("Do you want to save the ingredients of this recipe? (yes/no): ", (saveIngredientsAnswer) => {
            if (saveIngredientsAnswer.toLowerCase() === 'yes') {
              const ingredientsToSave = getAllIngredients([foundRecipe]);
              saveIngredientsToList(ingredientsToSave);
            } else {
              console.log("Ingredients not saved.");
            }
            displayMenu();
          });
        } else {
          console.log("Recipe not found.");
          displayMenu();
        }
      });
      break;
    case 5:
      console.log("All Saved Ingredients:");
      console.log(savedIngredients);
      displayMenu();
      break;
    case 6:
      rl.question("Enter recipe name to save ingredients: ", (name) => {
        const foundRecipe = getRecipeByName(cakeRecipes, name);
        if (foundRecipe) {
          const ingredientsToSave = getAllIngredients([foundRecipe]);
          saveIngredientsToList(ingredientsToSave); // Corrected function name
        } else {
          console.log("Recipe not found.");
        }
        displayMenu();
      });
      break;
    case 0:
      console.log("Exiting...");
      rl.close();
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
      displayMenu();
  }
};

displayMenu();
