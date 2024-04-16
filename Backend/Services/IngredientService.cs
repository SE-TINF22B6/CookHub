using DataAccess.Entities;
using DataAccess.Repository;

namespace Services;

/// <summary>
/// Class that handles ingredient logic
/// </summary>
public class IngredientService
{
    private readonly IRepository<Ingredient> _repository;

    public IngredientService(IRepository<Ingredient> repository)
    {
        _repository = repository;
    }

    public IEnumerable<Ingredient> GetAllIngredients()
    {
        return _repository.GetAll();
    }
    
    public Ingredient? GetIngredientById(int id)
    {
        var ingredient = _repository.Get(id);
        return ingredient;
      
    }

    public List<Ingredient> GetIngredientByName(string name)
    {
        var ingredients = _repository.GetAll();
        return ingredients.Where(r => r.Name.Contains(name)).ToList();
    }
}