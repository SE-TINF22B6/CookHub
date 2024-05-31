namespace API.Models;

public class PasswordChangeModel
{
    public required string OldPassword { get; set; }
    public required string NewPassword { get; set; }
}