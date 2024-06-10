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

        var likedRecipes = _userService.GetLikedRecipesByUserId(userId)?.Select(recipe => recipe.ToModel());
        return Ok(likedRecipes);
    }

    [HttpPost("change-username")]
    public IActionResult ChangeUsername([FromBody] string newUsername)
    {
        var error = string.Empty;
        return GenericUserRequest(userId => _userService.TryChangeUsername(userId, newUsername, out error), in error);
    }

    [HttpPost("change-password")]
    public IActionResult ChangePassword([FromBody] PasswordChangeModel input)
    {
        var error = string.Empty;
        return GenericUserRequest(userId => _userService.TryChangePassword(userId, input.OldPassword, input.NewPassword, out error), in error);
    }

    [HttpPost("change-profile-picture")]
    public IActionResult ChangeProfilePicture([FromBody] string base64Image)
    {
        var error = string.Empty;
        return GenericUserRequest(userId => _userService.TryChangeProfilePicture(userId, base64Image, out error), in error);
    }

    [HttpDelete("delete-account")]
    public IActionResult DeleteAccount([FromBody] string password)
    {
        var error = string.Empty;
        return GenericUserRequest(userId =>
        {
            var isDeleted = _userService.TryDeleteAccount(userId, password, out error);
            if (isDeleted) LogOut();
            return isDeleted;
        }, in error);
    }

    private IActionResult GenericUserRequest(Predicate<int> tryWithUserId, in string errorAfterInvoke)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

        var success = tryWithUserId.Invoke(userId);

        return success ? Ok() : BadRequest(errorAfterInvoke);
    }

    /// <summary>
    /// Views a recipe and updates the user's history
    /// </summary>
    [HttpPost("view-recipe/{recipeId:int}")]
    public IActionResult ViewRecipe(int recipeId)
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in.");
        }

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

        _userService.ViewRecipe(user, recipe);

        return Ok($"User {userId} viewed Recipe {recipeId}.");
    }
    
    /// <summary>
    /// Gets the list of viewed recipes for the logged-in user
    /// </summary>
    [HttpGet("viewed-recipes")]
    public IActionResult GetViewedRecipes()
    {
        var userId = GetIdOfLoggedInUser();

        if (userId == -1)
        {
            return BadRequest("User is not logged in."); 
        }

        var user = _userService.GetUserById(userId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        var viewedRecipes = user.History.Select(historyEntry => historyEntry.ToModel()).ToList();
        return Ok(viewedRecipes);
    }

    [HttpGet("own-recipes")]
    public IActionResult GetOwnRecipes()
    {
        var userId = GetIdOfLoggedInUser();

        if (GetIdOfLoggedInUser() == -1)
        {
            return BadRequest("User is not logged in."); 
        }

        var user = _userService.GetUserById(userId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        var ownRecipes = user.CreatedRecipes.Select(recipe => recipe.ToModel());
        return Ok(ownRecipes);
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