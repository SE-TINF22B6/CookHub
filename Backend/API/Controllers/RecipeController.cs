using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;


/// <summary>
/// Class that defines api endpoints for recipes
/// </summary>
[ApiController]
[Route("[controller]")]
public class RecipeController: ControllerBase
{
    private readonly RecipeService _recipeService;

    public RecipeController(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpGet("{id}")]
    public IActionResult GetRecipe(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);
        return Ok(recipe);
    }
    
    [HttpGet("byname/{name}")]
    public IActionResult GetRecipeByName(string name)
    {
        var recipes = _recipeService.GetRecipesByName(name);
        return Ok(recipes);
    }

    [HttpGet("byingredient")]
    public IActionResult GetRecipesByIngredients([FromQuery] List<string> ingredients)
    {
        var recipes = _recipeService.GetRecipesByIngredients(ingredients);
        return Ok(recipes);
    }
}