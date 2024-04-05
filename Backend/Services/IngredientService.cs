using DataAccess.Entities;
using DataAccess.Repository;

namespace Services;

public class IngredientService
{
    private readonly IRepository<Ingredient> _repository;

    public IngredientService(IRepository<Ingredient> repository)
    {
        _repository = repository;
    }
}