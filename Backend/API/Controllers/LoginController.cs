using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserService _userService;

    public LoginController(UserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost]
    public string Login([FromBody] LoginDataModel loginData)
    {
        var isValidUserData = _userService.TryValidateUserData(loginData.Email, loginData.Password);

        return isValidUserData ? "login data correct" : "login data incorrect";
    }
}