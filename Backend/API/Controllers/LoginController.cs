using API.Models;
using Contracts.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

/// <summary>
/// Class that defines api endpoints for the login functionality
/// </summary>
[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserService _userService;
    private readonly Dictionary<string, int> _authTokens;
    private const string TokenKey = "auth-token";

    public LoginController(UserService userService, Dictionary<string, int> authTokens)
    {
        _userService = userService;
        _authTokens = authTokens;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginDataModel loginData)
    {
        var isValidUserData = _userService.TryValidateUserData(loginData.Email, loginData.Password, out var user);

        if (!isValidUserData)
        {
            return BadRequest("Invalid login data.");
        }

        var authToken = CryptoService.GenerateToken();
        _authTokens.Add(authToken, user!.Id);

        Response.Cookies.Append(TokenKey, authToken, new CookieOptions
        {
            Path = "/",
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.Now.AddDays(30)
        });

        return Ok();
    }

    [HttpGet("log-out")]
    public IActionResult LogOut()
    {
        var authToken = Request.Cookies[TokenKey];
        Response.Cookies.Delete(TokenKey);

        if (authToken?.Length == 32)
        {
            _authTokens.Remove(authToken);
        }

        return Ok();
    }

    [HttpGet("is-logged-in")]
    public IActionResult IsLoggedIn()
    {
        var authToken = Request.Cookies[TokenKey];

        if (authToken == null || !_authTokens.TryGetValue(authToken, out var userId))
        {
            return NotFound("Not logged in");
        }

        var user = _userService.GetUserById(userId);
        return user == null ? Problem("Could not get user from data base") : Ok(user);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDataModel registerData)
    {
        var isValidRegisterData = _userService.TryValidateRegisterData(registerData.Name,
                                                                       registerData.Email,
                                                                       registerData.Password,
                                                                       out var error);
        if (!isValidRegisterData)
        {
            return BadRequest(error);
        }

        _userService.CreateUser(new User
        {
            Email = registerData.Email,
            Name = registerData.Name,
            PasswordHash = CryptoService.GetHash(registerData.Password)
        });

        return Login(new LoginDataModel { Email = registerData.Email, Password = registerData.Password });
    }
}