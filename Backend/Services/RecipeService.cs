using DataAccess.Entities;
using DataAccess.Repository;

namespace Services;

/// <summary>
/// Class that handles recipe logic
/// </summary>
public class RecipeService
{
    private readonly IRepository<Recipe> _repository;

    public RecipeService(IRepository<Recipe> repository)
    {
        _repository = repository;
    }
    
    public List<Recipe> GetAllRecipes()
    {
        return _repository.GetAll();
    }

    public Recipe? GetRecipeById(int id)
    {
        var recipe =_repository.Get(id);
        return recipe;
      
    }
    
    public List<Recipe> GetRecipesByName(string name)
    {
        var trimmedName = name.Trim();
        var allRecipes = _repository.GetAll();
    
        return allRecipes
            .Where(r => r.Name.Contains(trimmedName, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(r => r.Name.StartsWith(trimmedName, StringComparison.OrdinalIgnoreCase))
            .ThenBy(r => r.Name.IndexOf(trimmedName, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }


    public List<Recipe> GetRecipesByIngredients(List<string> ingredients)
    {
        var allRecipes = _repository.GetAll();
        return allRecipes
            .Where(r => r.Ingredients.Any(i => ingredients.Any(ingredient => 
                string.Equals(ingredient, i.Ingredient.Name, StringComparison.OrdinalIgnoreCase))))
            .ToList();
    }

    
    public void CreateRecipe(Recipe recipe)
    {
        if (string.IsNullOrWhiteSpace(recipe.Name))
        {
            throw new ArgumentException("Recipe name cannot be empty.", nameof(recipe));
        }
        _repository.Create(recipe);
    }
    
    public void DeleteRecipe(int id)
    {
        var recipe = _repository.Get(id);
        if (recipe == null)
        {
            throw new InvalidOperationException("Recipe not found.");
        }

        _repository.Delete(recipe);
    }
}
