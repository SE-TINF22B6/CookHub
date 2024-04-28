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
        var allRecipes = _repository.GetAll();
        return allRecipes.Where(r => r.Name.Contains(name)).ToList();
    }

    public List<Recipe> GetRecipesByIngredients(List<string> ingredients)
    {
        var allRecipes = _repository.GetAll();
        return allRecipes.Where(r => r.Ingredients.Any(i => ingredients.Contains(i.Ingredient.Name))).ToList();
    }
    
    public void CreateRecipe(Recipe recipe)
    {
        var existingRecipe = _repository.GetAll().FirstOrDefault(i => i.Name.Equals(recipe.Name, StringComparison.OrdinalIgnoreCase));
        if (existingRecipe != null)
        {
            throw new InvalidOperationException("An recipe with the same name already exists.");
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
