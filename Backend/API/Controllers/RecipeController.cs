using API.Models;
using Contracts.Models;
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
    private readonly AdventurizeService _adventurizeService;
    private readonly Dictionary<string, int> _authTokens;

    public RecipeController(RecipeService recipeService, AdventurizeService adventurizeService, Dictionary<string, int> authTokens)
    {
        _recipeService = recipeService;
        _adventurizeService = adventurizeService;
        _authTokens = authTokens;
    }
    
    /// <summary>
    /// Gets a List with all recipes
    /// </summary>
    [HttpGet]
    public ActionResult<IEnumerable<RecipeModel>> GetAllRecipes()
    {
        var viewerId = GetIdOfLoggedInUser();
        var recipes = _recipeService.GetAllRecipes().Select(recipe => recipe.ToModel(viewerId));
        return Ok(recipes);
    }

    /// <summary>
    /// Gets a recipe by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public IActionResult GetRecipe(int? id)
    {
        if (id == null)
        {
            return BadRequest("ID cannot be null.");
        }

        var recipe = _recipeService.GetRecipeById(id.Value);
    
        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        var viewerId = GetIdOfLoggedInUser();
        return Ok(recipe.ToModel(viewerId));
    }

    /// <summary>
    /// Gets recipes by search term in their name
    /// </summary>
    [HttpGet("byname/{name}")]
    public IActionResult GetRecipeByName(string name)
    {
        var viewerId = GetIdOfLoggedInUser();
        var recipes = _recipeService.GetRecipesByName(name).Select(recipe => recipe.ToModel(viewerId));
        return Ok(recipes);
    }

    /// <summary>
    /// Gets recipe by Ingredient
    /// </summary>
    [HttpGet("byingredient")]
    public IActionResult GetRecipesByIngredients([FromQuery] List<string> ingredients)
    {
        var viewerId = GetIdOfLoggedInUser();
        var recipes = _recipeService.GetRecipesByIngredients(ingredients).Select(recipe => recipe.ToModel(viewerId));
        return Ok(recipes);
    }

    
    [HttpGet("adventurize/{id:int}")]
    public async Task<IActionResult> AdventurizeRecipe(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }
        
        var (success, message) = await _adventurizeService.TryCreateAdventureTextAsync(recipe.ToString());

        return success ? Ok(message) : Problem(message);
    }
    
    /// <summary>
    /// Create new recipe
    /// </summary>
    [HttpPost]
    public IActionResult CreateRecipe(CreateRecipeModel recipe)
    {
        var creatorId = GetIdOfLoggedInUser();

        if (creatorId == -1)
        {
            return BadRequest("You have to be logged in to create a recipe");
        }

        if (string.IsNullOrWhiteSpace(recipe.Name))
        {
            return BadRequest("Recipe name is required.");
        }

        var pictureFileName = "";

        if (recipe.Picture.Length > 0 && !RecipeService.TrySaveRecipeImage(recipe.Picture, out pictureFileName))
        {
            return BadRequest("Invalid base64 image.");
        }

        var recipeId = _recipeService.CreateRecipeWithIngredients(recipe.ToSavableEntity(creatorId, pictureFileName));
        return Created($"/myRecipes/{recipeId}", recipeId);
    }

    /// <summary>
    /// Deletes Recipe by ID
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult DeleteRecipe(int id)
    {
        try
        {
            _recipeService.DeleteRecipe(id);
            return Ok("Recipe successfully deleted");
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    /// Gets Top Recipes
    /// </summary>
    [HttpGet("top/{count:int}")]
    public IActionResult GetTopRecipes(int count)
    {
        var viewerId = GetIdOfLoggedInUser();
        var topRecipes = _recipeService.GetTopRecipes(count).Select(recipe => recipe.ToModel(viewerId));
        return Ok(topRecipes);
    }

    /// <summary>
    /// Gets number of likes
    /// </summary>
    [HttpGet("{id}/likes/count")]
    public IActionResult GetLikesCount(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        var likesCount = recipe.LikedBy.Count;
        return Ok(likesCount);
    }
    

    /// <summary>
    /// Uploads an image to a recipe
    /// </summary>
    [HttpPost("upload-image")]
    public IActionResult UploadRecipeImage([FromBody] string base64Image)
    {
        var success = RecipeService.TrySaveRecipeImage(base64Image, out var fileName);
        return success ? Ok(fileName) : BadRequest("Invalid base64 image.");
    }

    [HttpPost("adventurize")]
    public IActionResult SaveAdventure([FromBody] AdventureModel adventure)
    {
        var success = _recipeService.TrySaveAdventure(adventure.RecipeId, adventure.Text, out var errorMessage);
        return success ? Ok() : BadRequest(errorMessage);
    }
    
    private int GetIdOfLoggedInUser()
    {
        var isLoggedIn = _authTokens.TryGetValue(Request.Cookies["auth-token"]?? "", out var userId);
        return isLoggedIn ? userId : -1;
    }
}