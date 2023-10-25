using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private LoginDataModel _adminLoginData = new LoginDataModel
    {
        Email = "admin@cookhub.com",
        Password = "admin"
    };
    
    [HttpPost]
    public string Login([FromBody] LoginDataModel loginData)
    {
        if (loginData.Email == _adminLoginData.Email && loginData.Password == _adminLoginData.Password)
        {
            return "you are logged in";
        }

        return "wrong login data";
    }
}