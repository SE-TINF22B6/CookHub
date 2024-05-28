using API.Models;
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
    private readonly Dictionary<string, int> _authTokens;

    public UserController(UserService userService, RecipeService recipeService, Dictionary<string, int> authTokens)
    {
        _userService = userService;
        _recipeService = recipeService;
        _authTokens = authTokens;
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
        var user = _userService.GetUserById(userId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var likedRecipes = _userService.GetLikedRecipesByUserId(userId);
        return Ok(likedRecipes);
    }

    [HttpPost("change-username")]
    public IActionResult ChangeUsername([FromBody] string newUsername)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

        var success = _userService.TryChangeUsername(userId, newUsername, out var error);

        return success ? Ok() : BadRequest(error);
    }

    [HttpPost("change-password")]
    public IActionResult ChangePassword([FromBody] PasswordChangeModel passwordChange)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

        var success = _userService.TryChangePassword(userId, passwordChange.OldPassword, passwordChange.NewPassword, out var error);

        return success ? Ok() : BadRequest(error);
    }

    [HttpPost("change-profile-picture")]
    public IActionResult ChangeProfilePicture([FromBody] string base64Image)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

        var success = _userService.TryChangeProfilePicture(userId, base64Image, out var error);

        return success ? Ok() : BadRequest(error);
    }

    [HttpDelete("delete-account")]
    public IActionResult DeleteAccount([FromBody] string password)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

        var success = _userService.TryDeleteAccount(userId, password, out var error);
        LogOut();

        return success ? Ok() : BadRequest(error);
    }

    private int GetIdOfLoggedInUser()
    {
        var isLoggedIn = _authTokens.TryGetValue(Request.Cookies["auth-token"]?? "", out var userId);
        return isLoggedIn ? userId : -1;
    }

    private void LogOut()
    {
        var authToken = Request.Cookies["auth-token"];
        Response.Cookies.Delete("auth-token");
        _authTokens.Remove(authToken?? "");
    }
}