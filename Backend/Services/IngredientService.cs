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
}