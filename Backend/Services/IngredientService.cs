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
        return ingredients.Where(r => r.Name.Contains(name, StringComparison.OrdinalIgnoreCase)).ToList();
    }

    
    public void CreateIngredient(Ingredient ingredient)
    {
        // Checking if an ingredient with the same name already exists
        var existingIngredient = _repository.GetAll().FirstOrDefault(i => i.Name.Equals(ingredient.Name, StringComparison.OrdinalIgnoreCase));
        if (existingIngredient != null)
        {
            throw new InvalidOperationException("An ingredient with the same name already exists.");
        }

        _repository.Create(ingredient);
    }
    
    public void DeleteIngredient(int id)
    {
        var ingredient = _repository.Get(id);
        if (ingredient == null)
        {
            throw new InvalidOperationException("Ingredient not found.");
        }

        _repository.Delete(ingredient);
    }
}