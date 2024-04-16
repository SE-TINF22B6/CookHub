using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;


/// <summary>
/// Class that defines api endpoints for ingredients
/// </summary>
[ApiController]
[Route("[controller]")]
public class IngredientController: ControllerBase
{
    private readonly IngredientService _ingredientService;

    public IngredientController(IngredientService ingredientService)
    {
        _ingredientService = ingredientService;
    }
    
    
    /// <summary>
    /// Gets a List of all ingredients
    /// </summary>
    [HttpGet]
    public ActionResult<IEnumerable<Ingredient>> GetAllIngredients()
    {
        var ingredients =  _ingredientService.GetAllIngredients();
        return Ok(ingredients);
    }
    
    
    /// <summary>
    /// Gets a ingredient by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetIngredient(int? id)
    {
        if (id == null)
        {
            return BadRequest("ID cannot be null.");
        }

        var ingredient = _ingredientService.GetIngredientById(id.Value);
    
        if (ingredient == null)
        {
            return NotFound("Ingredient not found.");
        }

        return Ok(ingredient);
    }

    [HttpGet("byname/{name}")]
    public IActionResult GetIngredientByName(string name)
    {
            var ingredients = _ingredientService.GetIngredientByName(name);
            return Ok(ingredients);
    }

}