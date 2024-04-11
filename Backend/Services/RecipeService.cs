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

    public Recipe GetRecipeById(int id)
    {
        var recipe =_repository.Get(id);
        if (recipe != null)
        {
            return recipe;
        }

        throw new Exception("Recipe not found");
    }
    
    public List<Recipe> GetRecipesByName(string name)
    {
        var allRecipes = _repository.GetAll();
        return _repository.GetAll().Where(r => r.Name.Contains(name)).ToList();
    }

    public List<Recipe> GetRecipesByIngredients(List<string> ingredients)
    {
        var allRecipes = _repository.GetAll();
        return _repository.GetAll().Where(r => r.Ingredients.Any(i => ingredients.Contains(i.Name))).ToList();
    }
}
