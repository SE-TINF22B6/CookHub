using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpPost("upload-profile-picture")]
    public IActionResult UploadProfilePicture([FromBody] string base64Image)
    {
        var success = UserService.TrySaveProfilePicture(base64Image, out var fileName);
        return success ? Ok(fileName) : BadRequest("Invalid base64 image.");
    }
}