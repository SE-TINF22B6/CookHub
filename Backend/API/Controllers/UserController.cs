using DataAccess.Entities;
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

    [HttpPost("upload-profile-picture")]
    public IActionResult UploadProfilePicture([FromBody] string base64Image)
    {
        var success = UserService.TrySaveProfilePicture(base64Image, out var fileName);
        return success ? Ok(fileName) : BadRequest("Invalid base64 image.");
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetAllUsers()
    {
        var user =  _userService.GetAllUsers();
        return Ok(user);
    }
    
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
    
}