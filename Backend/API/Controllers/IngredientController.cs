using Contracts.Entities;
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
    /// Gets an ingredient by ID
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

    /// <summary>
    /// Gets all ingredients by Search Term (Name)
    /// </summary>
    [HttpGet("byname/{name}")]
    public IActionResult GetIngredientByName(string name)
    {
            var ingredients = _ingredientService.GetIngredientByName(name);
            return Ok(ingredients);
    }
    
    /// <summary>
    /// Create a new Ingredient
    /// </summary>
    [HttpPost]
    public IActionResult CreateIngredient(Ingredient ingredient)
    {
        if (ingredient == null)
        {
            return BadRequest("Ingredient data is missing.");
        }
        if (string.IsNullOrWhiteSpace(ingredient.Name))
        {
            return BadRequest("Ingredient name is required.");
        }

        _ingredientService.CreateIngredient(ingredient);

        return CreatedAtAction(nameof(GetIngredient), new { id = ingredient.Id }, ingredient);
    }

    /// <summary>
    /// Delete an Ingredient by ID
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult DeleteIngredient(int id)
    {
        try
        {
            _ingredientService.DeleteIngredient(id);
            return Ok("Ingredient successfully deleted");
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
    }

}