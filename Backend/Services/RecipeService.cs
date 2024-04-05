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
}