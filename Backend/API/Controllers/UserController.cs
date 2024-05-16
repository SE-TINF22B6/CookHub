using Contracts.Models;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    
    private readonly UserService _userService;
    private readonly RecipeService _recipeService;

    public UserController(UserService userService, RecipeService recipeService)
    {
        _userService = userService;
        _recipeService = recipeService;
    }

    /// <summary>
    /// Saves an img as a profile picture
    /// </summary>
    [HttpPost("upload-profile-picture")]
    public IActionResult UploadProfilePicture([FromBody] string base64Image)
    {
        var success = UserService.TrySaveProfilePicture(base64Image, out var fileName);
        return success ? Ok(fileName) : BadRequest("Invalid base64 image.");
    }
    
    /// <summary>
    /// Get all Users
    /// </summary>
    [HttpGet]
    public ActionResult<IEnumerable<UserModel>> GetAllUsers()
    {
        var users =  _userService.GetAllUsers().Select(user => user.ToModel());
        return Ok(users);
    }
    
    /// <summary>
    /// Gets a user by ID
    /// </summary>
    [HttpGet("/{id}")]
    public IActionResult GetUser(int? id)
    {
        if (id == null)
        {
            return BadRequest("ID cannot be null.");
        }

        var user = _userService.GetUserById(id.Value);
    
        if (user == null)
        {
            return NotFound("User not found.");
        }

        return Ok(user.ToModel());
    }
    
    /// <summary>
    /// Lets a user like a recipe
    /// </summary>
    [HttpPost("like-recipe/{userId:int}/{recipeId:int}")]
    public IActionResult LikeRecipe(int userId, int recipeId)
    {
        var user = _userService.GetUserById(userId);
        var recipe = _recipeService.GetRecipeById(recipeId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        if (recipe.LikedUserIds.Contains(userId))
        {
            return BadRequest("User already liked this recipe.");
        }

        try
        {
            _userService.LikeRecipe(user, recipe);
            return Ok($"User {userId} liked recipe {recipeId}.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
    
    /// <summary>
    /// Lets a user unlike a recipe
    /// </summary>
    [HttpDelete("unlike-recipe/{userId:int}/{recipeId:int}")]
    public IActionResult UnlikeRecipe(int userId, int recipeId)
    {
        var user = _userService.GetUserById(userId);
        var recipe = _recipeService.GetRecipeById(recipeId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        if (!recipe.LikedUserIds.Contains(userId))
        {
            return BadRequest("User hasn't liked this recipe.");
        }

        try
        {
            _userService.UnlikeRecipe(user, recipe);
            return Ok($"User {userId} unliked recipe {recipeId}.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }

    
    /// <summary>
    /// Gets a list with all recipes like by an user
    /// </summary>
    [HttpGet("{userId}/liked-recipes")]
    public IActionResult GetLikedRecipes(int userId)
    {
        var likedRecipes = _userService.GetLikedRecipesByUserId(userId);

        return Ok(likedRecipes);
    }
    
}