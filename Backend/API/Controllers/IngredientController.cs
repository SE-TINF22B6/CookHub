using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;
[ApiController]
[Route("[controller]")]
public class IngredientController: ControllerBase
{
    private readonly IngredientService _ingredientService;

    public IngredientController(IngredientService ingredientService)
    {
        _ingredientService = ingredientService;
    }

}