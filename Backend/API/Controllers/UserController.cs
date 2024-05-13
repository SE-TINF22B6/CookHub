using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

/// <summary>
/// Class that defines api endpoints for users
/// </summary>
[ApiController]
[Route("[controller]")]
public class UserController: ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }
}
    